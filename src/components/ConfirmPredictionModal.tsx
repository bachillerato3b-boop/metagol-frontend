/**
 * ============================================================
 * ConfirmPredictionModal
 * ============================================================
 * Confirmación explícita antes del pago
 */

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmPredictionModal({
  onConfirm,
  onCancel
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">
          Confirmación final
        </h2>

        <p className="mb-6">
          Una vez realizada la transacción,
          <strong>
            {" "}
            su predicción no podrá ser modificada
          </strong>
          .
          <br />
          ¿Está conforme con su predicción?
        </p>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Revisar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Confirmar y pagar
          </button>
        </div>
      </div>
    </div>
  );
}
