import React from 'react';
import { X, Printer, CheckCircle, Download, Building, Calendar, Shield } from 'lucide-react';
import { TranscriptRequest } from '../types';
import { UNIVERSITY_INFO } from '../data/mockData';

interface PrintReceiptModalProps {
  request: TranscriptRequest;
  onClose: () => void;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({ request, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const priorityAmount = request.priority === 'same_day' ? 20000 : request.priority === 'express' ? 10000 : 0;
  const courierAmount = request.transcriptType === 'official_hardcopy' ? 6500 : 0;
  const baseAmount = request.totalFee - priorityAmount - courierAmount;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-8">
        {/* Modal Controls (Hidden in print) */}
        <div className="no-print bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold">Official University Bursary & Remita RRR Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-6 sm:p-8 printable-transcript-page bg-white text-slate-900">
          <div className="border-b-2 border-slate-900 pb-4 mb-5 text-center">
            <h2 className="font-display-crest text-lg font-bold tracking-tight text-slate-900">
              {UNIVERSITY_INFO.name}
            </h2>
            <p className="text-xs uppercase tracking-wider text-slate-700 font-semibold mt-0.5">
              Office of the University Bursar • Treasury & Revenue Directorate
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {UNIVERSITY_INFO.address}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Remita TSA Payment Confirmed & Validated</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 text-xs mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 block">Tracking Reference:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{request.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Remita Retrieval Ref (RRR):</span>
              <span className="font-mono font-bold text-amber-800 text-sm">
                {request.remitaRrr || '3309-8412-9014'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Student Matriculation No:</span>
              <span className="font-mono font-semibold text-slate-900">{request.studentId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">JAMB Registration No:</span>
              <span className="font-mono font-semibold text-slate-900">{request.jambRegNo || '96102844AJ'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Student Legal Name:</span>
              <span className="font-medium text-slate-800">{request.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">State of Origin:</span>
              <span className="font-medium text-slate-800">{request.stateOfOrigin || 'Anambra State'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Academic Program:</span>
              <span className="font-medium text-slate-800">{request.degree}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Date & Time of Transaction:</span>
              <span className="font-medium text-slate-800">{request.submittedAt}</span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                <tr>
                  <th className="py-2.5 px-3 text-left font-semibold">Service Description</th>
                  <th className="py-2.5 px-3 text-center font-semibold">Target / Route</th>
                  <th className="py-2.5 px-3 text-right font-semibold">Amount (NGN ₦)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-2.5 px-3">
                    <span className="font-medium text-slate-900 capitalize">
                      {request.transcriptType.replace('_', ' ')}
                    </span>
                    <p className="text-[11px] text-slate-500">Official academic transcript records search & verification</p>
                  </td>
                  <td className="py-2.5 px-3 text-center capitalize text-slate-600">
                    {request.recipientType}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium">
                    ₦{baseAmount.toLocaleString('en-NG')}
                  </td>
                </tr>
                {priorityAmount > 0 && (
                  <tr>
                    <td className="py-2.5 px-3">
                      <span className="font-medium text-slate-900">Senate Priority Processing Surcharge</span>
                      <p className="text-[11px] text-slate-500">
                        {request.priority === 'same_day' ? 'Same-Day Urgent Senate Clearance' : 'Express Priority Queue (48h)'}
                      </p>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-600">Registrar Priority</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">
                      ₦{priorityAmount.toLocaleString('en-NG')}
                    </td>
                  </tr>
                )}
                {courierAmount > 0 && (
                  <tr>
                    <td className="py-2.5 px-3">
                      <span className="font-medium text-slate-900">Logistics & Watermark Security Envelope</span>
                      <p className="text-[11px] text-slate-500">Waybill dispatch via GIG Logistics / NIPOST Speedpost</p>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-600">Registered Courier</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">
                      ₦{courierAmount.toLocaleString('en-NG')}
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200">
                <tr>
                  <td colSpan={2} className="py-2.5 px-3 text-right font-bold text-slate-900">
                    Total Remita Settlement:
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 text-sm">
                    ₦{request.totalFee.toLocaleString('en-NG')} NGN
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-3 space-y-1">
            <p>
              • <strong>Payment Channel:</strong> Remita Electronic Gateway / Central Bank of Nigeria (CBN) TSA Account #014029104
            </p>
            <p>
              • <strong>Designated Recipient:</strong> {request.recipientName} ({request.recipientEmail})
            </p>
            <p>
              • <strong>Attestation:</strong> Certified by {UNIVERSITY_INFO.bursar} ({UNIVERSITY_INFO.bursarTitle}).
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="no-print bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md text-xs font-semibold transition-colors"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
