import type { ReactNode } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"

// bottom sheet on mobile, centered modal on sm+
function DialogPopup({ children }: { children: ReactNode }) {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Backdrop className="fixed inset-0 z-40 bg-black/40" />
      <AlertDialog.Popup className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 pb-8 shadow-xl sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:max-h-[90vh] sm:w-[calc(100%-2rem)] sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:pb-6">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border sm:hidden" />
        {children}
      </AlertDialog.Popup>
    </AlertDialog.Portal>
  )
}

export { DialogPopup }
