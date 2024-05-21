import { jsPDF } from "jspdf";
import "jspdf-autotable";

const exportPdf = async (title) => {
  const doc = new jsPDF({ orientation: "landscape" });

  doc.autoTable({
    html: "#my-table",
  });

  doc.save(title);
};

export default exportPdf;
