import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

import SalesTable from "../../components/tables/sales-table/SalesTable";

export default function SalesTables() {
  return (
    <>
      <PageBreadcrumb pageTitle="Sales Table" />
      <div className="space-y-6">
        <ComponentCard title="Sales Table">
          <SalesTable />
        </ComponentCard>
      </div>
    </>
  );
}
