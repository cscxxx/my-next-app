// import Form from "@/app/ui/invoices/edit-form";
// import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { getTag } from "../../astions";
import EditForm from "./edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const tag: any = await getTag(Number(id));
  if (!tag) {
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
      <EditForm tag={tag}></EditForm>
    </main>
  );
}
