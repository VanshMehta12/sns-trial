import Layout from "@/components/Layout/Layout";
import SingleCategory from "@/components/PagesComponent/SingleCategory/SingleCategory"
import axios from "axios";

export const generateMetadata = async ({ params }) => {
    try {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}get-categories?slug=${params?.slug[0]}`
        );

        const stopWords = ['the', 'is', 'in', 'and', 'a', 'to', 'of', 'for', 'on', 'at', 'with', 'by', 'this', 'that', 'or', 'as', 'an', 'from', 'it', 'was', 'are', 'be', 'has', 'have', 'had', 'but', 'if', 'else'];

        const generateKeywords = (description) => {
            if (!description) {
                return process.env.NEXT_PUBLIC_META_kEYWORDS
                    ? process.env.NEXT_PUBLIC_META_kEYWORDS.split(',').map(keyword => keyword.trim())
                    : [];
            }

            // Convert description to lowercase, remove punctuation, and split into words
            const words = description
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .split(/\s+/);

            // Filter out common stop words
            const filteredWords = words.filter(word => !stopWords.includes(word));

            // Count the frequency of each word
            const wordFrequency = filteredWords.reduce((acc, word) => {
                acc[word] = (acc[word] || 0) + 1;
                return acc;
            }, {});

            // Sort words by frequency and return the top keywords
            const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);

            // Return top 10 keywords (or less if there are fewer words)
            return sortedWords.slice(0, 10);
        }

        const selfCategory = response.data?.self_category
        const title = selfCategory?.translated_name
        const description = selfCategory?.description
        const keywords = generateKeywords(selfCategory?.description)
        const image = selfCategory?.image

        return {
            title: title ? title : process.env.NEXT_PUBLIC_META_TITLE,
            description: description ? description : process.env.NEXT_PUBLIC_META_DESCRIPTION,
            openGraph: {
                images: image ? [image] : [],
            },
            keywords: keywords,
        };
    } catch (error) {
        console.error("Error fetching MetaData:", error);
        return null;
    }
};


const getCategoryItems = async (slug) => {
    // const isDemoMode = settings?.demo_mode;

    // const location = [cityData?.city, cityData?.state, cityData?.country]
    //     .filter(Boolean)
    //     .join(', ');

    try {
        const params = {
            page: 1,
            category_slug: slug,
            platform: "web",
            location
        };

        // if (!isDemoMode) {
        //     if (KmRange > 0 && cityData?.lat && cityData?.long) {
        //         params.radius = KmRange;
        //         params.latitude = cityData.lat;
        //         params.longitude = cityData.long;
        //     } else {
        //         if (cityData?.city) {
        //             params.city = cityData.city;
        //         } else if (cityData?.state) {
        //             params.state = cityData.state;
        //         } else if (cityData?.country) {
        //             params.country = cityData.country;
        //         }
        //     }
        // }

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_END_POINT}get-item`,
            { params }
        );

        return response?.data?.data?.data || [];
    } catch (error) {
        console.error('Error fetching Product Items Data:', error);
        return [];
    }
};




const SingleCategoryPage = async ({ params }) => {

    const categoryItems = await getCategoryItems(params?.slug[0])

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: categoryItems.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1, // Position starts at 1
            item: {
                "@type": "Product",
                productID: product?.id,
                name: product?.name,
                description: product?.description,
                image: product?.image,
                url: `${process.env.NEXT_PUBLIC_WEB_URL}/product-details/${product?.slug}`,
                category: {
                    "@type": "Thing",
                    name: product?.category?.name,
                },
                offers: {
                    "@type": "Offer",
                    price: product?.price,
                    priceCurrency: "USD",
                },
                countryOfOrigin: product?.country,
            }
        }))
    };


    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Layout>
                <SingleCategory slug={params.slug} />
            </Layout>
        </>
    )
}

export default SingleCategoryPage