"use client"

import type React from "react"

import SubHeader from "@/components/SubHeader"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function WritetoParty() {
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        if (!isAuthenticated) {
            // Ensure we always have a valid language route
            // let safeLanguageRoute = " "
            // if (pathname.includes("/gu")) {
            //     safeLanguageRoute = "/gu"
            // } else if (pathname.includes("/en")) {
            //     safeLanguageRoute = "/en"
            // } else {
            //     safeLanguageRoute = "/en"
            // }
            // router.push(`${safeLanguageRoute}/join`)
            router.push(`/join`)

        } else {
            // fetchMemberData()
        }
    }, [isAuthenticated, router])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setFiles((prev) => [...prev, ...newFiles])
        }
    }

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log({ name, mobile, description, files })
    }

    const getFileIcon = (fileType: string) => {
        if (fileType.includes("image")) return "🖼️"
        if (fileType.includes("video")) return "🎬"
        if (fileType.includes("pdf")) return "📄"
        if (fileType.includes("word") || fileType.includes("document")) return "📝"
        return "📎"
    }

    return (
        <>
            <SubHeader />
            <div className="container p-4">
                <div className="card border-0">
                    <h2 className="font1 fw-bold mb-3">WRITE TO PARTY</h2>
                    <div className="card-body border">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="mobile"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="files" className="form-label">
                                    Add Files (Images, Videos, PDF, DOC)
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="files"
                                    multiple
                                    accept="image/*,video/*,.pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                />
                                <div className="form-text">You can select multiple files</div>
                            </div>

                            {files.length > 0 && (
                                <div className="mb-3">
                                    <p className="mb-2">Selected Files:</p>
                                    <div className="list-group">
                                        {files.map((file, index) => (
                                            <div
                                                key={index}
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <span className="me-2">{getFileIcon(file.type)}</span>
                                                    {file.name}
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-danger px-4 py-2" style={{ padding: 0 }}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

