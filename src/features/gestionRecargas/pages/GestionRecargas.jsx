import React, { useState, useEffect } from "react";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { DataTable } from "@/components/DataTable/DataTable";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";
import style from "./GestionRecargas.module.css";
import useModal from "@/hooks/useModal";
import GenerateExcelButton from "../components/GenerateExcelButton";
import Loading from "@/components/Loading/Loading";
import { useSelector } from "react-redux";
import { getHora, getTime } from "@/helpers/getTime";
import axios from "axios";
import { url } from "@/connections/mainApi";


export const GestionRecargas = () => {
  const { Modal, hideModal, showModal } = useModal();
  const [selectedDates, setSelectedDates] = useState({
    dateInit: null,
    dateFin: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const loginData = useSelector((state) => state.auth?.login?.token);

  const handleDateChange = (name, value) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));

  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const startDate = selectedDates.dateInit;
      const endDate = selectedDates.dateFin;

      const config = {
      
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      };

      const response = await axios.get(
        `${url}/transaccion`,
        config
      );
      console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDates.dateInit && selectedDates.dateFin) {
      handleClick();
    }
  }, [selectedDates.dateInit, selectedDates.dateFin]);

  const key = data
    .flatMap((item) => item.userId)
    .reduce((obj, id) => ({ ...obj, id }), {});

  return (
    <>
      <MainContentStructure>
        <h2 className="title__sections">Historial de transacciones</h2>
        <hr />
        <SectionStructure>
          <div className={style.calendar_container}>
            <PrimeCalendar
              width="45%"
              value={selectedDates.dateInit}
              onChange={(e) => handleDateChange("dateInit", e.value)}
              textLabel="Fecha inicio"
            />

            <PrimeCalendar
              width="45%"
              value={selectedDates.dateFin}
              onChange={(e) => handleDateChange("dateFin", e.value)}
              textLabel="Fecha final"
            />
            {/* <Button
              label="Obtener Datos"
              onClick={handleClick}
              style={{ width: "20%", margin: "2rem auto 0" }}
            /> */}
          </div>
        </SectionStructure>

        {isLoading ? (
          <div style={{ margin: "5rem" }}>
            <Loading />
          </div>
        ) : data.length === 0 ? (
          <div className={style.section__date}>
            <h3 style={{ width: "100%", textAlign: "center" }}>
              Seleccione una fecha para obtener los datos
            </h3>
          </div>
        ) : (
          <DataTable
            columns={columns}
            key={key?.id}
            data={data}
            onAddModal={showModal}
            buttonExcel={true}


          />
        )}
      </MainContentStructure>

      <Modal
        width={"450px"}
        height={"250px"}
        title={isLoading ? "Cargando Datos" : "Documento Generado"}
      >
        {isLoading ? (
          <div className={style.loading_modal}>{/* <Loading /> */}</div>
        ) : (
          <div className={style.modal_excel}>
            <h3>Documento Generado</h3>
            <span>Cantidad Datos: {data.length}</span>
            <GenerateExcelButton
              data={data}
              getFecha={getTime}
              getHora={getHora}
            />
          </div>
        )}
      </Modal>
    </>
  );
};



const getProductValue = (rowData) => {
  return rowData.type_fuel === 1 ? "Regular" : "Premium";
};

const columns = [
  { nombre: "Código de venta", campo: "purchaseCode" },
  { nombre: "Fecha", campo: getTime },
  { nombre: "Hora de Compra", campo: getHora },
  { nombre: "Producto", campo: getProductValue },
  { nombre: "N° Galones", campo: "gallons" },
  { nombre: "Precio", campo: "amountPrice" },
  { nombre: "Estado", campo: "transactionStatus" },
];
