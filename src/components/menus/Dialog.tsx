"use client"
// dave gray - https://github.com/gitdagray/next-dialog-modal/blob/main/src/app/components/Dialog.tsx
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
import styles from '@styles/menus/popup.module.scss'
import { useRouter } from 'next/navigation'
import { IoMdClose } from 'react-icons/io'

type Props = {
    title?: string,
    buttonLabel?:string,
    onClose?: () => void,
    onOk?: () => void,
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
      if(onClose) onClose()
    }

    const clickOk = () => {
      if(onOk) onOk()
      router.back()
      closeDialog()
    }

    // todo hide and show with style components so i can get a smooth transition
    const dialog: JSX.Element | null = (showPopup === 'modal') || (showPopup === 'dialog')
        ? (
          
          <dialog 
              ref={dialogRef} 
              className={(showPopup) ? [styles.open, styles.popup].join(' ') : styles.popup }
              onTransitionEnd={handleTransitionEnd}
            >

            <button 
              className={styles.background} 
              onClick={closeDialog}
            > 
             {/* if user clicks off of dialog box, close it */}
            </button>

            <div className={styles.card}>

              <div>

                <h2>{title}</h2>

                <button
                  onClick={closeDialog}
                  className={styles.close}
                >
                  <IoMdClose />
                </button>
              </div>

              <div className={styles.content}>

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