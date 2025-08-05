import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { createInvoice, updateInvoice, getInvoice } from '../../api/invoice';

const InvoiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    amount: '',
    due_date: dayjs(),
    description: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const invoice = await getInvoice(id);
      setFormData({
        customer_name: invoice.customer_name,
        amount: invoice.amount.toString(),
        due_date: dayjs(invoice.due_date),
        description: invoice.description || '',
        status: invoice.status,
      });
    } catch (err) {
      console.error('Error fetching invoice:', err);
      setError('Failed to load invoice data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      due_date: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.amount) {
      setError('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const invoiceData = {
        ...formData,
        amount,
        due_date: formData.due_date.format('YYYY-MM-DD'),
      };

      if (id) {
        await updateInvoice(id, invoiceData);
      } else {
        await createInvoice(invoiceData);
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving invoice:', err);
      setError(
        err.response?.data?.detail ||
        'Failed to save invoice. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit Invoice' : 'Create Invoice'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Customer Name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Due Date"
                  value={formData.due_date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                  >
                    {saving ? <CircularProgress size={24} /> : (id ? 'Update' : 'Create')}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default InvoiceForm;