"use client"
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubHeader from '@/components/SubHeader';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface ReferredMemberRecord {
    id: number;
    name: string;
    mobile: string;
    assembly_name: string;
    membershipId: string;
    created_at: string;
}

const ReferredMember: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [referredData, setReferredData] = useState<ReferredMemberRecord[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(`/join`);
        } else {
            fetchReferredMembers();
        }
    }, [isAuthenticated, router]);

    const fetchReferredMembers = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem("auth_token");
            console.log("Authentication Token:", token);

            if (!token) {
                setError('No authentication token found');
                return;
            }

            // Update API URL to fetch referred members, not donation list
            const apiUrl = `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}referedMembers`;
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

            const referred = responseData?.data || responseData || [];
            console.log("Parsed Referred Members:", referred);

            setReferredData(referred);

            if (referred.length === 0) {
                console.warn("No referred member records found");
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
                    <h2 className='font1 fw-bold mb-3'>REFERRED MEMBER ({referredData.length})</h2>
                    <div
                        className="card-header text-white d-flex justify-content-between align-items-center py-2 px-3"
                        style={{
                            background: 'linear-gradient(to right,rgb(255, 0, 0),rgb(255, 94, 0))',
                            color: 'white'
                        }}
                    >
                        <h5 className="m-0">Referred Member</h5>
                    </div>

                    {/* Responsive Table Container */}
                    <div className="table-responsive">
                        <table className="table table-striped table-hover m-0 custom-table">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="py-2 px-3">Sr No</th>
                                    <th className="py-2 px-3">Name</th>
                                    <th className="py-2 px-3">Mobile</th>
                                    <th className="py-2 px-3">Assembly</th>
                                    <th className="py-2 px-3">Membership No</th>
                                    <th className="py-2 px-3">Joining Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referredData.length > 0 ? (
                                    referredData.map((record, index) => (
                                        <tr key={record.id}>
                                            <td className="py-2 px-3" data-label="Sr No">{index + 1}</td>
                                            <td className="py-2 px-3" data-label="Name">{record.name}</td>
                                            <td className="py-2 px-3" data-label="Mobile">{record.mobile}</td>
                                            <td className="py-2 px-3" data-label="Assembly">{record.assembly_name || " - "}</td>
                                            <td className="py-2 px-3" data-label="Membership No">{record.membershipId}</td>
                                            <td className="py-2 px-3" data-label="Joining Date">  {record.created_at ? new Date(record.created_at).toISOString().split("T")[0] : " - "}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-3">No records found!</td>
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

export default ReferredMember;