export default function PaymentDetails() {
  return (
    <div className="bg-white">
      {/* Title */}
      <h3 className="text-md font-medium text-[#4559ED] mb-4">
        Payment Details
      </h3>

      <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
        
        {/* LEFT */}
        <div className="space-y-3">
          <p className="font-medium text-md mb-1 text-[#6B7385]">
            International Student:
          </p>

          <p className="text-[#D08522] font-semibold">
            PayPal:forensicdocument@gmail.com
          </p>

          <hr className="my-4 border-gray-200" />

          <p className="font-medium text-[#6B7385]">
            Account Detail for National Student
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 text-sm">
            <div className="space-y-1">
              <p>
                <span className="text-[#D08522] font-semibold">Bank Name:</span>{" "}
                <span className="text-[#3D3D3D] font-semibold">ICICI BANK</span>
              </p>

              <p>
                <span className="text-[#D08522] font-semibold">Account Name:</span>{" "}
                <span className="text-[#3D3D3D] font-semibold">
                  SIFS INDIA PVT. LTD.
                </span>
              </p>

              <p>
                <span className="text-[#D08522] font-semibold">Account No.:</span>{" "}
                <span className="text-[#3D3D3D] font-semibold">
                  663055000006
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <span className="text-[#D08522] font-semibold">Type:</span>{" "}
                <span className="text-[#3D3D3D] font-semibold">
                  Current Account
                </span>
              </p>

              <p>
                <span className="text-[#D08522] font-semibold">IFSC Code:</span>{" "}
                <span className="text-[#3D3D3D] font-semibold">
                  ICIC0000160
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-start md:items-center">
          <img
            src="/course/qr.png"
            alt="QR Code"
            className="w-60 border border-gray-200 rounded-lg p-2 bg-white"
          />
        </div>

      </div>
    </div>
  );
}
