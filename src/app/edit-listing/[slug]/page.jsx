import Layout from "@/components/Layout/Layout";
import dynamic from "next/dynamic";

const EditListing = dynamic(() =>
  import("@/components/PagesComponent/EditListing/EditListing")
);

// ✅ Fix: No TypeScript types here
export async function generateMetadata({ params }) {
  return {
    title: process.env.NEXT_PUBLIC_META_TITLE,
    description: process.env.NEXT_PUBLIC_META_DESCRIPTION,
    keywords: process.env.NEXT_PUBLIC_META_kEYWORDS,
    openGraph: {
      title: process.env.NEXT_PUBLIC_META_TITLE,
      description: process.env.NEXT_PUBLIC_META_DESCRIPTION,
    },
  };
}

const EditListingPage = ({ params }) => {
  return (
    <Layout>
      <EditListing id={params.slug} />
    </Layout>
  );
};

export default EditListingPage;
