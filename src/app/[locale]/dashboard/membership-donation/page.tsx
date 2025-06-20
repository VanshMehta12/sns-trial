"use client"
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubHeader from '@/components/SubHeader';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface DonationRecord {
  id?: string;
  name?: string;
  payment_mode?: string;
  amount?: string;
  status?: string;
  mobile?: string;
  date?: string;
}

const MembershipDonationHistory: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [donationData, setDonationData] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/join`);
    } else {
      fetchMemberData();
    }
  }, [isAuthenticated, router]);

  const fetchMemberData = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("auth_token");
      console.log("Authentication Token:", token);

      if (!token) {
        setError('No authentication token found');
        return;
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}donationList`;
      console.log("Attempting to fetch from URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Response Status:", response.status);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const errorText = await response.text();
        console.error("Non-JSON Response:", errorText);
        setError(`Unexpected response type. Expected JSON, got: ${contentType}`);
        return;
      }

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error("JSON Parsing Error:", parseError);
        const rawText = await response.text();
        console.error("Raw Response Text:", rawText);
        setError('Failed to parse JSON response');
        return;
      }

      const donations = responseData?.data || responseData || [];
      console.log("Parsed Donations:", donations);

      setDonationData(donations);

      if (donations.length === 0) {
        console.warn("No donation records found");
      }
    } catch (error) {
      console.error("Detailed Fetch Error:", error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubHeader />
      <div className="container p-4">
        <div className="card border-0">
          <h2 className='font1 fw-bold mb-3'>DONATION</h2>
          <div
            className="card-header text-white d-flex justify-content-between align-items-center py-2 px-3"
            style={{
              background: 'linear-gradient(to right,rgb(255, 0, 0),rgb(255, 94, 0))',
              color: 'white'
            }}
          >
            <h5 className="m-0">Donation History</h5>
          </div>

          {/* Responsive Table Container */}
          <div className="table-responsive">
            <table className="table table-striped table-hover m-0 custom-table">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="py-2 px-3">Sr No</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Mobile</th>
                  <th className="py-2 px-3">Mode</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {donationData.length > 0 ? (
                  donationData.map((record, index) => (
                    <tr key={record.id || index}>
                      <td className="py-2 px-3" data-label="Sr No">{index + 1}</td>
                      <td className="py-2 px-3" data-label="Name">{record.name}</td>
                      <td className="py-2 px-3" data-label="Mobile">{record.mobile}</td>
                      <td className="py-2 px-3" data-label="Mode">{record.payment_mode}</td>
                      <td className="py-2 px-3" data-label="Amount">{record.amount}</td>
                      <td className="py-2 px-3" data-label="Status">{record.status}</td>
                      <td className="py-2 px-3" data-label="Date">28/10/2004</td>
                      <td className="py-2 px-3" data-label="Receipt">
                        <button
                          className='btn btn-sm btn-danger'
                        // onClick={() => handleDownloadReceipt(record)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-3">No records found!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Optional Loading and Error States */}
          {loading && (
            <div className="text-center py-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MembershipDonationHistory;