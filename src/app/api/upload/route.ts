import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/enums";
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("jwtToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const externalApiResponse = await fetch(
      `${API_BASE_URL}/api/service/media/${formData.get("businessId")}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!externalApiResponse.ok) {
      const errorData = await externalApiResponse.json();
      return NextResponse.json(
        { error: errorData },
        { status: externalApiResponse.status },
      );
    }

    const responseData = await externalApiResponse.json();
    console.log("responseData", responseData);
    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
