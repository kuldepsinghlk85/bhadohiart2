import React from 'react';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function AdminInquiriesPage() {
  let inquiries: any[] = [];
  try {
    inquiries = await prisma.quotation.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">WhatsApp Inquiries</h1>
      </div>

      <div className="bg-white border border-[var(--color-brand-border)] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF7F0] border-b border-[var(--color-brand-border)] text-[var(--color-brand-dark)]">
              <th className="p-4 font-bold text-sm">Date</th>
              <th className="p-4 font-bold text-sm">Customer</th>
              <th className="p-4 font-bold text-sm">Phone</th>
              <th className="p-4 font-bold text-sm">Details</th>
              <th className="p-4 font-bold text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-[var(--color-brand-muted)]">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              inquiries.map(inq => {
                const waMessage = `Hello ${inq.name},\n\nRegarding your inquiry for ${inq.carpetType || 'our carpets'}, your current status is: *${inq.status}*.\n\nPlease let us know if you need any further assistance.`;
                return (
                  <tr key={inq.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                    <td className="p-4 text-sm align-top whitespace-nowrap">{format(new Date(inq.createdAt), 'MMM d, yyyy HH:mm')}</td>
                    <td className="p-4 text-sm font-bold text-[var(--color-brand-dark)] align-top">{inq.name}</td>
                    <td className="p-4 text-sm align-top">
                      {inq.phone}
                      <br />
                      <a href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline text-xs mt-1 inline-flex items-center gap-1">
                        Send WhatsApp Update
                      </a>
                    </td>
                    <td className="p-4 text-sm align-top">
                      <div className="whitespace-pre-wrap text-[var(--color-brand-muted)] max-w-lg">
                        {inq.message || inq.carpetType || 'No details provided'}
                      </div>
                    </td>
                    <td className="p-4 text-sm align-top">
                      <form action={async (formData) => {
                        "use server";
                        try {
                          await prisma.quotation.update({
                            where: { id: inq.id },
                            data: { status: formData.get("status") as string }
                          });
                        } catch(e) {
                          const globalAny: any = global;
                          if (globalAny.__mockInquiries) {
                            const mock = globalAny.__mockInquiries.find((m:any) => m.id === inq.id);
                            if (mock) mock.status = formData.get("status");
                          }
                        }
                        const { revalidatePath } = await import('next/cache');
                        revalidatePath('/admin/inquiries');
                      }} className="flex items-center gap-2">
                        <select 
                          name="status"
                          defaultValue={inq.status}
                          className="border border-[var(--color-brand-border)] px-2 py-1 text-xs outline-none"
                        >
                          <option value="NEW">NEW</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="QUOTED">QUOTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                        <button type="submit" className="bg-[var(--color-brand-dark)] text-white px-2 py-1 text-xs hover:bg-[var(--color-brand-burgundy)]">
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
