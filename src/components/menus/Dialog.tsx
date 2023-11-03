"use client"
// dave gray - https://github.com/gitdagray/next-dialog-modal/blob/main/src/app/components/Dialog.tsx
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
import styles from '@styles/menus/popup.module.scss'
import { useRouter } from 'next/navigation'
import { IoMdClose } from 'react-icons/io'

type Props = {
    title: string,
    buttonLabel?:string,
    onClose: () => void,
    onOk: () => void,
    children: React.ReactNode,
}

export default function DialogPopup({ title, onClose, onOk, buttonLabel = 'OK', children }: Props) {

    const searchParams = useSearchParams()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showPopup = searchParams?.get('popup')
    const router = useRouter()

    useEffect(() => {

      switch (showPopup) {
        case 'modal':
          dialogRef.current?.showModal();
          break;

        case 'dialog':
          dialogRef.current?.show();
          break;

        default:
          dialogRef.current?.close();
      }

    }, [showPopup])

    const handleTransitionEnd = () => {
      if (!showPopup) {
        if(!dialogRef.current) return
        closeDialog()
      }
    };

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
          
          <dialog 
              ref={dialogRef} 
              className={(showPopup) ? [styles.open, styles.popup].join(' ') : styles.popup }
              onTransitionEnd={handleTransitionEnd}
            >

            <button className={styles.background} onClick={closeDialog}>  </button>

            <div className={styles.card}>

              <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">

                <h2 className="text-2xl">{title}</h2>

                <button
                  onClick={closeDialog}
                  className={styles.close}
                >
                  <IoMdClose />
                </button>
              </div>

              <div>

                {children}

                {buttonLabel && (
                  <div className={styles.buttons_wrap} >
                    <button
                      onClick={clickOk}
                      className={`button`}
                    >
                      {buttonLabel}
                    </button>

                  </div>
                )}
              </div>
        
            </div>

            
          </dialog>

          ) 
        : null


    return dialog
}