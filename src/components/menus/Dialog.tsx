"use client"
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
import styles from '@styles/menus/popup.module.scss'
import { useRouter } from 'next/navigation'

type Props = {
    title: string,
    onClose: () => void,
    onOk: () => void,
    children: React.ReactNode,
}

export default function DialogPopup({ title, onClose, onOk, children }: Props) {

    const searchParams = useSearchParams()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showPopup = searchParams?.get('popup')
    const router = useRouter()

    useEffect(() => {
      if (showPopup === 'modal') {
        dialogRef.current?.showModal()
      } else 
      if (showPopup === 'dialog') {
        dialogRef.current?.show() //? for dialog box
      } else {
        dialogRef.current?.close()
      }
    }, [showPopup])

    const closeDialog = () => {
      dialogRef.current?.close()
      console.log('dialog.tsx closeDialog');
      router.back()
      onClose()
    }

    const clickOk = () => {
      onOk()
      router.back()
      closeDialog()
    }

    const dialog: JSX.Element | null = (showPopup === 'modal') || (showPopup === 'dialog')
        ? (
          <dialog ref={dialogRef} className={styles.popup}>
            <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">

              <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">
                <h1 className="text-2xl">{title}</h1>
                <button
                  onClick={closeDialog}
                  className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
                >
                  x
                </button>
              </div>

              <div className="px-5 pb-6">
                {children}
                <div className="flex flex-row justify-end mt-2">
                  <button
                    onClick={clickOk}
                    className="bg-green-500 py-1 px-2 rounded border-none"
                  >
                    OK
                  </button>
                </div>
              </div>
        
            </div>
          </dialog>
          ) 
        : null


    return dialog
}