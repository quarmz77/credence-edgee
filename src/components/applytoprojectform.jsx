import { useState } from 'react';
import api from '../lib/api';
import Button from '../components/Button';

export default function ApplyToProjectForm({ projectId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleApply() {
    setIsSubmitting(true);
    try {
      await api.post('/applications', { projectId });
    } catch (err) {
      console.error('Application failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button variant="primary" isLoading={isSubmitting} onClick={handleApply}>
      Apply to Project
    </Button>
  );
}