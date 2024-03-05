import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export const exportPDF = rows => {
  const doc = new jsPDF();
  const tableColumn = ["Código", "Nombre del Producto", "Características", "Empresa"]; 
  const tableRows = [];

  rows.forEach(row => {
    const productData = [
      row.code,
      row.name,
      row.characteristics,
      row.company.name
    ];
    tableRows.push(productData);
  });

  // Dibujamos la tabla en el documento PDF
  autoTable(doc, { head: [tableColumn], body: tableRows });

  // Guardamos el PDF
  doc.save(`inventario.pdf`);
};
