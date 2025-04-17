// import Form from "@/app/ui/invoices/edit-form";
// import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditForm from "./edit-form";
import { getAllTags, getPostById } from "../../actions";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const post: any = await getPostById(Number(id));
  const allTags = await getAllTags();

  if (!post) {
    notFound();
  }
  //   debugger;
  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      /> */}
      <EditForm post={post} allTags={allTags}></EditForm>
    </main>
  );
}
