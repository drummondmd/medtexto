
import { Input, ResetPassForm } from "@/components/auth/reset-pass";
import { getUser } from "@/lib/databases/handler-pgdb";
import { notFound } from "next/navigation";

export default async function ResetPass({ params }) {
    const { userNameSlug } = await params;
    const userDetail = await getUser(userNameSlug);

    if (!userDetail) {
        notFound()
    }


    return <ResetPassForm userDetail={userDetail} />




}