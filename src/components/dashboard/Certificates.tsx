import React from 'react';
import { AwardIcon, DownloadIcon } from 'lucide-react';
interface CertificateType {
  name: string;
  issuer: string;
  date: string;
  image: string;
}
interface CertificatesProps {
  certificates: CertificateType[];
}
export const Certificates: React.FC<CertificatesProps> = ({
  certificates
}) => {
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Sertifikat & Badge
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Penghargaan yang telah diperoleh
        </p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((certificate, index) => <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-32 overflow-hidden bg-gray-100">
                <img src={certificate.image} alt={certificate.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800">
                  {certificate.name}
                </h3>
                <div className="flex items-center mt-1">
                  <AwardIcon size={14} className="text-[#504DFF]" />
                  <span className="text-xs text-gray-500 ml-1">
                    {certificate.issuer}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">
                    {certificate.date}
                  </span>
                  <button className="text-[#504DFF] hover:text-[#403DC9]">
                    <DownloadIcon size={16} />
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};