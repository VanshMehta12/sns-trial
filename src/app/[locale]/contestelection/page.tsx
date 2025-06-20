"use client"
import React, { useEffect, useState } from 'react';
import "@/styles/styles.css"
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface FormData {
    fullname: string;
    gender: string;
    mobile: string;
    dob: string;
    state: string;
    district: string;
    assembly: string;
    addressfield: string;
    village: string;
    pincode: string;
    religion: string;
    caste: string;
    education: string;
    whatsapp: string;
    membershipId: string;
    cv: string | File;
    area_interested: string;
}

interface StateData {
    name: string;
    id: string;
}

interface DistrictData {
    name: string;
    id: string;
}

interface AssemblyData {
    name: string;
    id: string;
}

const ContestElectionForm = () => {
    const initialFormState: FormData = {
        fullname: "",
        gender: "",
        mobile: "",
        dob: "",
        state: "",
        district: "",
        assembly: "",
        addressfield: "",
        village: "",
        pincode: "",
        religion: "",
        caste: "",
        education: "",
        whatsapp: "",
        membershipId: "",
        cv: "",
        area_interested: ""
    };






    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [userID, setuserID] = useState("")


    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [states, setStates] = useState<{ name: string; id: number }[]>([])
    const [districts, setDistricts] = useState<{ name: string; id: number }[]>([])
    const [assemblies, setAssemblies] = useState<{ name: string; id: number }[]>([])
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
            // If user data exists in localStorage, use it
            const parsedUserData = JSON.parse(storedUserData);
            setuserID(parsedUserData.userID || "")
        }
    }, [isAuthenticated])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "state") {
            getDistrict(Number(value));
            setFormData(prev => ({ ...prev, district: "", assembly: "" }));
        }
        if (name === "district") {
            getAssembly(Number(value));
            setFormData(prev => ({ ...prev, assembly: "" }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                cv: e.target.files![0]
            }));
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setDistricts([]);
        setAssemblies([]);

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }

        const checkbox = document.getElementById('termsCheck') as HTMLInputElement;
        if (checkbox) {
            checkbox.checked = false;
        }
    };

    async function getState() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}state`, { cache: "no-store" })
            if (!res.ok) throw new Error("Failed to fetch data")

            const dt = await res.json()

            if (Array.isArray(dt.data)) {
                setStates(
                    dt.data.map((state: StateData) => ({
                        name: state.name,
                        id: state.id,
                    })),
                )
            } else {
                setStates([])
            }
        } catch (err) {
            console.error(err)
            setStates([])
        }
    }

    async function getDistrict(state_id: number) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}district?state_id=${state_id}`, { cache: "no-store" })
            if (!res.ok) throw new Error("Failed to fetch districts")

            const dt = await res.json()

            if (Array.isArray(dt.data)) {
                setDistricts(
                    dt.data.map((district: DistrictData) => ({
                        name: district.name,
                        id: district.id,
                    })),
                )
            } else {
                setDistricts([])
            }
        } catch (err) {
            console.error(err)
            setDistricts([])
        }
    }

    async function getAssembly(district_id: number) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}assemblyConstituencey?district_id=${district_id}`, { cache: "no-store" })
            if (!res.ok) throw new Error("Failed to fetch assemblies")

            const dt = await res.json()

            if (Array.isArray(dt.data)) {
                setAssemblies(
                    dt.data.map((assembly: AssemblyData) => ({
                        name: assembly.name,
                        id: assembly.id,
                    })),
                )
            } else {
                setAssemblies([])
            }
        } catch (err) {
            console.error(err)
            setAssemblies([])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        SubmitForm();
    };

    function SubmitForm() {
        const formdata = new FormData()

        formdata.append("user_id", userID || "");
        formdata.append("full_name", formData.fullname || "");
        formdata.append("gender", formData.gender || "");
        formdata.append("mobile", formData.mobile || "");
        formdata.append("dob", formData.dob || "");
        formdata.append("state_id", formData.state || "");
        formdata.append("district_id", formData.district || "");
        formdata.append("assembly_constituency_id", formData.assembly || "");
        formdata.append("address", formData.addressfield || "");
        formdata.append("village", formData.village || "");
        formdata.append("pincode", formData.pincode || "");
        formdata.append("religion", formData.religion || "");
        formdata.append("caste", formData.caste || "");
        formdata.append("education_qualification", formData.education || "");
        formdata.append("whatsapp_no", formData.whatsapp || "");
        formdata.append("area_interested", formData.area_interested || "");

        if (formData.cv && typeof formData.cv !== "string") {
            formdata.append("cvfile", formData.cv);
        }


        const token = sessionStorage.getItem("auth_token");

        fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}ContestElection`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formdata,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Data added successfully", data);
                alert("Form submitted successfully!");
                resetForm();
                setSubmitting(false);
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                alert("Error submitting form. Please try again.");
                setSubmitting(false);
            });
    }

    useEffect(() => {
        getState();
    }, []);

    const isFieldEmpty = (fieldName: keyof FormData) => !formData[fieldName];

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{
            background: "url('/assets/img/constestelection.png') no-repeat center center",
            backgroundSize: "cover",
        }}>
            <div className="container-fluid" style={{ margin: "80px 0px" }}>
                <div className="row justify-content-center gap-5">
                    <div className="col-12 col-md-9 col-lg-8">
                        <div className="card shadow-lg border-0 px-5">
                            <div className="card-header bg-white border-0 text-center py-4 mb-2">
                                <h4 className="font1 h1 mb-3 mt-4" style={{ color: "#5D5D5D", fontWeight: 500 }}>Contest Election</h4>
                                <small className='fw-bold h5' style={{ color: "#CB392C" }}>JOIN NOW PAJA SHAKTI DEMOCRATIC PARTY</small>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-2">
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">Full Name <span className="text-danger" style={{ display: isFieldEmpty('fullname') ? '' : 'none' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="fullname"
                                                value={formData.fullname}
                                                onChange={handleChange}
                                                className="form-control border border-secondary"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Date of Birth <span className="text-danger" style={{ display: isFieldEmpty('dob') ? '' : 'none' }}>*</span></label>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                className="form-control border border-secondary"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Gender <span className="text-danger" style={{ display: isFieldEmpty('gender') ? '' : 'none' }}>*</span></label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="form-select border border-secondary"
                                                required
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Religion <span className="text-danger" style={{ display: isFieldEmpty('religion') ? '' : 'none' }}>*</span></label>
                                            <select
                                                name="religion"
                                                value={formData.religion}
                                                onChange={handleChange}
                                                className="form-select border border-secondary"
                                                required
                                            >
                                                <option value="">Select Religion</option>
                                                <option value="hindu">Hindu</option>
                                                <option value="muslim">Muslim</option>
                                                <option value="christian">Christian</option>
                                                <option value="sikh">Sikh</option>
                                                <option value="buddhist">Buddhist</option>
                                                <option value="jain">Jain</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Caste <span className="text-danger" style={{ display: isFieldEmpty('caste') ? '' : 'none' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="caste"
                                                value={formData.caste}
                                                onChange={handleChange}
                                                className="form-control border border-secondary"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">State <span className="text-danger" style={{ display: isFieldEmpty('state') ? '' : 'none' }}>*</span></label>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="form-select border border-secondary"
                                                required
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state) => (
                                                    <option key={state.id} value={state.id}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">District <span className="text-danger" style={{ display: isFieldEmpty('district') ? '' : 'none' }}>*</span></label>
                                            <select
                                                name="district"
                                                value={formData.district}
                                                onChange={handleChange}
                                                className="form-select border border-secondary"
                                                required
                                                disabled={!formData.state}
                                            >
                                                <option value="">Select District</option>
                                                {districts.map((district) => (
                                                    <option key={district.id} value={district.id}>
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Assembly Constituency <span className="text-danger" style={{ display: isFieldEmpty('assembly') ? '' : 'none' }}>*</span></label>
                                            <select
                                                name="assembly"
                                                value={formData.assembly}
                                                onChange={handleChange}
                                                className="form-select border border-secondary"
                                                required
                                                disabled={!formData.district}
                                            >
                                                <option value="">Select Assembly</option>
                                                {assemblies.map((assembly) => (
                                                    <option key={assembly.id} value={assembly.id}>
                                                        {assembly.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Village <span className="text-danger" style={{ display: isFieldEmpty('village') ? '' : 'none' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="village"
                                                value={formData.village}
                                                onChange={handleChange}
                                                className="form-control border border-secondary"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Address <span className="text-danger" style={{ display: isFieldEmpty('addressfield') ? '' : 'none' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="addressfield"
                                                value={formData.addressfield}
                                                onChange={handleChange}
                                                className="form-control border border-secondary"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Pincode <span className="text-danger" style={{ display: isFieldEmpty('pincode') ? '' : 'none' }}>*</span></label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                className="form-control border border-secondary"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Educational Qualification <span className="text-danger" style={{ display: isFieldEmpty('education') ? '' : 'none' }}>*</span></label>
                                            <select
                                                name="education"
                                                value={formData.education}
                                                onChange={handleChange}
                                                className="form-select border border-secondary"
                                                required
                                            >
                                                <option value="">Select Qualification</option>
                                                <option value="highschool">High School</option>
                                                <option value="graduate">Graduate</option>
                                                <option value="postgraduate">Post Graduate</option>
                                                <option value="professional">Professional Degree</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Mobile No. <span className="text-danger" style={{ display: isFieldEmpty('mobile') ? '' : 'none' }}>*</span></label>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className="form-control border border-secondary"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">WhatsApp No. <span className="text-danger" style={{ display: isFieldEmpty('whatsapp') ? '' : 'none' }}>*</span></label>
                                        <input
                                            type="tel"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            className="form-control border border-secondary"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Please upload your up-to-date CV <span className="text-danger" style={{ display: isFieldEmpty('cv') ? '' : 'none' }}>*</span></label>
                                        <input
                                            type="file"
                                            name="cv"
                                            onChange={handleFileChange}
                                            className="form-control border border-secondary"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Please list your affiliations with the area you hope to represent <span className="text-danger" style={{ display: isFieldEmpty('area_interested') ? '' : 'none' }}>*</span></label>
                                        <textarea
                                            name="area_interested"
                                            value={formData.area_interested}
                                            onChange={handleChange}
                                            className="form-control border border-secondary"
                                            rows={3}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mb-4 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input border border-secondary"
                                            id="termsCheck"
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="termsCheck">
                                            I have read and agree to the terms and conditions of membership
                                        </label>
                                    </div>

                                    <div className="text-center my-4 mb-2">
                                        <button
                                            type="submit"
                                            className="px-5 btn contest_btn"
                                            disabled={submitting}
                                        >
                                            {submitting ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {!isAuthenticated && (
                <div
                    className="modal fade show d-flex align-items-center justify-content-center"
                    style={{
                        display: 'flex',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1050
                    }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Login Required</h5>
                            </div>
                            <div className="modal-body">
                                <p>You have to first Login and become a member to play contest election.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => { router.push('/join'); }}
                                >
                                    Go to Join Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ContestElectionForm;