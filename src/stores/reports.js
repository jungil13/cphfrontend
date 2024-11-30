// stores/reportsStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useReportsStore = defineStore('reports', {
  state: () => ({
    reports: [],
    isAuthenticated: false,
    token: null, // Store the JWT token
  }),
  actions: {
    async fetchReportsByUser(userId) {
      if (!this.isAuthenticated || !this.token) {
        console.error('User is not authenticated');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/reports/byReporter/${userId}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.reports = response.data;
      } catch (error) {
        console.error('Error fetching reports:', error.response ? error.response.data : error.message);
      }
    },
    async updateReportStatus(reportId, newStatus) {
      if (!this.isAuthenticated || !this.token) {
        console.error('User is not authenticated');
        return;
      }

      try {
        await axios.patch(`http://localhost:3000/api/reports/update/${reportId}`, { status: newStatus }, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        const report = this.reports.find(r => r.ReportID === reportId);
        if (report) {
          report.Status = newStatus;
        }
      } catch (error) {
        console.error('Failed to update report status:', error.response ? error.response.data : error.message);
      }
    },
    setAuthentication(status, token) {
      this.isAuthenticated = status;
      this.token = token; // Store the token
    }
  }
});
