import { useNavigate, Link, useParams, Links } from "react-router-dom";
import QRCode from 'react-qr-code';

const QRGen = () => {
  const qrValue = "http://localhost:5173/StaffAuth/1/1";

  return (
    <div className="card bg-base-100 shadow-md w-fit mx-auto p-4 mt-10">
      <div className="card-body items-center text-center">
        <h2 className="card-title mb-2">Scan QR Code</h2>
        <QRCode value={qrValue} size={200} />
        <p className="text-sm mt-2">{qrValue}</p>
      </div>
      <Link to="/StaffAuth" className="justify-start rounded-box cbgcolor py-5">
      <div className="cbgcolor bg-base-100 shadow-md w-fit mx-auto ">
        QR Code Scan
        </div>
      </Link>
    </div>
  );
};

export default QRGen;
