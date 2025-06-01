import { useEffect, useState } from "react";
import { FaChartLine } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";

import Badge from "../ui/badge/Badge";
import { salesAPI } from "../../services/api";

export default function EcommerceMetrics() {

  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    averageOrderValue: 0
  });

  useEffect(() => {
    fetchStates();
  }, []);
  const fetchStates = async () => {
    try {
      const sales = await salesAPI.getSales();
      const totalRevenue = sales.reduce((sum: any, sale: any) => sum + sale.amount, 0);
      const totalSales = sales.length;
      const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

      setStats({
        totalSales,
        totalRevenue,
        averageOrderValue
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FiShoppingCart className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Sales
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.totalSales}
            </h4>
          </div>
          <Badge color="success">
            <IoIosArrowRoundUp />
            11.01%
          </Badge>
        </div>
      </div>



      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <MdAttachMoney className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Revenue
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              ${stats.totalRevenue.toFixed(2)}
            </h4>
          </div>

          <Badge color="error">
            <IoIosArrowRoundDown />
            9.05%
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaChartLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Avg Order Value
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              ${stats.averageOrderValue.toFixed(2)}
            </h4>
          </div>

          <Badge color="error">
            <IoIosArrowRoundDown />
            15.05%
          </Badge>
        </div>
      </div>

    </div>
  );
}
