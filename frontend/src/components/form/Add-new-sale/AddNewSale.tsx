import { useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import DatePicker from "../date-picker.tsx";
import { salesAPI } from "../../../services/api.ts";
import { useNavigate } from "react-router";

type FormData = {
  product_name: string;
  amount: string;
  customer: string;
  date: string;
};

type Errors = {
  product_name?: string;
  amount?: string;
  customer?: string;
  date?: string;
};

interface DefaultInputsProps {
  onSaleAdded?: () => void;
}

export default function AddNewSale({ onSaleAdded }: DefaultInputsProps) {
  const [formData, setFormData] = useState<FormData>({
    product_name: '',
    amount: '',
    customer: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const navegate = useNavigate();

  const validate = (data: FormData): Errors => {
    const errs: Errors = {};
    if (!data.product_name.trim()) errs.product_name = "Product name is required";
    if (!data.customer.trim()) errs.customer = "Customer is required";
    if (!data.amount.trim()) errs.amount = "Amount is required";
    else if (isNaN(Number(data.amount)) || Number(data.amount) <= 0) errs.amount = "Amount must be a positive number";
    if (!data.date) errs.date = "Date is required";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: undefined 
    }));
  };

  const handleDateChange = (date: any) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
    setErrors(prev => ({
      ...prev,
      date: undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      const saleData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      await salesAPI.createSale(saleData);

      setFormData({
        product_name: '',
        amount: '',
        customer: '',
        date: new Date().toISOString().split('T')[0]
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      if (onSaleAdded) onSaleAdded();

      navegate("/total-sales");
    } catch (err: any) {
      setErrors({ product_name: err.message || "Failed to add sale" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Add sale" desc="Use the form below to add a new sale.">
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <Label htmlFor="product-name">Product Name</Label>
          <Input
            type="text"
            id="product-name"
            name="product_name"
            placeholder="Computer"
            onChange={handleChange}
            value={formData.product_name}
            disabled={loading}
          />
          {errors.product_name && <div className="text-red-500 text-sm">{errors.product_name}</div>}
        </div>
        <div>
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            type="text"
            id="amount"
            name="amount"
            placeholder="$1000"
            onChange={handleChange}
            value={formData.amount}
            disabled={loading}
          />
          {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}
        </div>
        <div>
          <Label htmlFor="customer">Customer</Label>
          <Input
            type="text"
            id="customer"
            name="customer"
            placeholder="John Doe"
            onChange={handleChange}
            value={formData.customer}
            disabled={loading}
          />
          {errors.customer && <div className="text-red-500 text-sm">{errors.customer}</div>}
        </div>
        <div>
          <DatePicker
            id="date-picker"
            label="Date Picker Input"
            placeholder="Select a date"
            value={formData.date}
            onChange={handleDateChange}
            disabled={loading}
          />
          {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Sale"}
          </button>
          {success && <div className="text-green-600 mt-2">Sale added successfully!</div>}
        </div>
      </form>
    </ComponentCard>
  );
}
