import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AddNewSale from "../../components/form/Add-new-sale/AddNewSale";

export default function AddNewSales() {
  return (
    <div>
  
      <PageBreadcrumb pageTitle="Add New Ssale" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 ">
        <div className="space-y-6">
          <AddNewSale />
        </div>
      </div>
    </div>
  );
}
