export default async function handler(req, res) {
    if (req.method === "POST") {
        console.log('====================================');
        console.log(req.body);
        console.log('====================================');
      try {
        const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Client-Id": "TEST105025422764513b3c6e214ec03d24520501",
            "X-Client-Secret": "cfsk_ma_test_aab6b50d48a35a3c59737f29da4e76be_af93d12f",
            "x-api-version": "2023-08-01",
          },
          body: (req.body),
        });
        
  
        const data = await response.json();
        
        res.status(response.status).json(data);
      } catch (error) {
        console.error("Cashfree API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  }
  