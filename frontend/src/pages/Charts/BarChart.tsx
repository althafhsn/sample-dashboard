import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BarChartOne from "../../components/charts/bar/BarChartOne";

export default function BarChart() {
  return (
    <div>

      <PageBreadcrumb pageTitle="Monthly Sales" />
      <div className="space-y-6">
        <ComponentCard title="Monthly Sales">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
