import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Expenses.css";
import {toast} from "react-toastify";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

const [formData, setFormData] = useState({
  title: "",
  amount: "",
  category: "",
  type: "Expense",
  date: "",
});

  useEffect(() => {
    fetchExpenses();
  }, [search, category, sort, page]);

  useEffect(() => {
    setPage(1);
}, [search, category, sort]);

  const fetchExpenses = async () => {
    try {
const res = await API.get(
  `/expenses?search=${search}&category=${category}&sort=${sort}&page=${page}`
);

setExpenses(res.data.expenses);
setTotalPages(res.data.totalPages);
      console.log("Expenses API Response:", res.data);

      if (Array.isArray(res.data)) {
        setExpenses(res.data);
      } else if (res.data.expenses) {
        setExpenses(res.data.expenses);
      } else {
        setExpenses([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
if (editingExpense) {
  await API.put(`/expenses/${editingExpense.id}`, formData);
} else {
  await API.post("/expenses", formData);
}
    toast.success("Expense Added Successfully");

    setShowModal(false);
    setEditingExpense(null);


    fetchExpenses();

    setFormData({
      title: "",
      amount: "",
      category: "",
      type: "Expense",
      date: "",
    });

  } catch (error) {
    console.log(error);
    alert("Failed to add expense");
  }
};
const handleEdit = (expense) => {
  setEditingExpense(expense);

  setFormData({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    type: expense.type,
    date: expense.date.slice(0, 10),
  });

  setShowModal(true);
};
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmDelete) return;

  try {

    await API.delete(`/expenses/${id}`);

    toast.success("Expense Deleted Successfully");

    fetchExpenses();

  } catch (error) {

    console.log(error);

    alert("Delete Failed");

  }

};

  return (
    <>
      <Navbar />

      <div className="expense-layout">
        <Sidebar />

        <div className="expense-page">
          <div className="expense-header">
  <h1>Expenses</h1>

  <button
    className="add-btn"
    onClick={() => setShowModal(true)}
  >
    + Add Expense
  </button>
</div>
<div className="search-box">

    <input
        type="text"
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

</div>
<div className="filters">

  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">All Categories</option>
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    <option value="Shopping">Shopping</option>
    <option value="Salary">Salary</option>
    <option value="Entertainment">Entertainment</option>
  </select>
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
>
    <option value="latest">Latest</option>
    <option value="oldest">Oldest</option>
    <option value="highest">Highest Amount</option>
    <option value="lowest">Lowest Amount</option>
</select>

</div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.title}</td>
                    <td>₹ {expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>{expense.type}</td>
                    <td>{expense.date?.slice(0, 10)}</td>
                   <td>

                    
  <button
    className="edit-btn"
    onClick={() => handleEdit(expense)}
  >
    ✏️Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(expense.id)}
  >
    Delete🗑️
  </button>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">

    <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
    >
        Previous
    </button>

    <span>
        Page {page} of {totalPages}
    </span>

    <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
    >
        Next
    </button>

</div>
        </div>
      </div>
      {showModal && (
  <div className="modal-overlay">

    <div className="modal">

      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option>Expense</option>
          <option>Income</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <div className="modal-buttons">

          <button type="submit">
            Save
          </button>

          <button
  type="button"
  onClick={() => {
    setShowModal(false);
    setEditingExpense(null);
  }}
>
  Cancel
</button>

        </div>

      </form>

    </div>

  </div>
)}
    </>
  );
}

export default Expenses;