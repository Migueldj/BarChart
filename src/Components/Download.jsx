import React from "react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

import PDF from "../Assets/pdf-icon.svg"
import IMAGE from "../Assets/image-icon.svg"
import ARROW from "../Assets/arrow-icon.svg"

export const Download = ({ chart }) => {
  const handleDownloadImg = async () => {
    console.log("Haz dado click en el botón de descarga");
    const element = chart.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const handleDownloadPdf = async () => {
    console.log("Haz dado click en el botón de descarga");
    const element = chart.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const pdf = new jsPdf({
      orientation: "landscape",
    });
    pdf.addImage(data, "JPEG", 0, 0);
    pdf.save(`${new Date().toISOString()}.pdf`);
  };

  return (
    <div className="d-flex justify-content-center mb-2 mt-4">
      <button className="btn btn-primary margin-button" onClick={handleDownloadImg}>
        <div className="d-flex justify-content-between align-items-between">
            <img src={IMAGE} alt="image" width={20} className="margin-button"/>
            <img src={ARROW} alt="arrow" width={15}/>
        </div>
      </button>
      <button className="btn btn-primary" onClick={handleDownloadPdf}>
        <img src={PDF} alt="pdf" width={20} className="margin-button"/>
        <img src={ARROW} alt="arrow" width={15}/>
      </button>
    </div>
  );
};
