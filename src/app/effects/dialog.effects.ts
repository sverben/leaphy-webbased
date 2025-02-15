import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { DialogState } from '../state/dialog.state';
import { CreditsDialog } from '../modules/core/dialogs/credits/credits.dialog';
import { InfoDialog } from '../modules/core/dialogs/info/info.dialog';
import { ConfirmEditorDialog } from '../modules/core/dialogs/confirm-editor/confirm-editor.dialog';
import { LanguageSelectDialog } from '../modules/core/dialogs/language-select/language-select.dialog';
import {SerialOutputComponent} from "../modules/shared/components/serial-output/serial-output.component";
import {LibraryManagerComponent} from "../modules/shared/components/library-manager/library-manager.component";

@Injectable({
    providedIn: 'root',
})

// Defines the effects on the Dialog that different state changes have
export class DialogEffects {

    constructor(
        private dialogState: DialogState,
        private dialog: MatDialog,
    ) {
        // When the info dialog visibility is set to true, open the dialog
        this.dialogState.isInfoDialogVisible$
            .pipe(filter(isVisible => !!isVisible))
            .subscribe(() => {
                this.dialog.open(InfoDialog, {
                    width: "800px",
                    disableClose: true,
                });
            });

        // If the isSerialOutputWindowOpen is set to true open the dialog
        this.dialogState.isSerialOutputWindowOpen$
            .subscribe(() => {
                if (this.dialogState.getIsSerialOutputWindowOpen() !== true)
                    return;
                this.dialog.open(SerialOutputComponent, {
                    width: "800px",
                    disableClose: true,
                    hasBackdrop: false,
                }).afterClosed().subscribe(() => {
                    this.dialogState.setIsSerialOutputWindowOpen(false);
                });
            });


        // If the isLibraryManagerWindowOpen is set to true open the dialog
        this.dialogState.isLibraryManagerWindowOpen$
            .subscribe(() => {
                if (this.dialogState.getIsLibraryManagerWindowOpen() !== true)
                    return;
                this.dialog.open(LibraryManagerComponent, {
                    width: "800px",
                    disableClose: true,
                }).afterClosed().subscribe(() => {
                    this.dialogState.setIsLibraryManagerWindowOpen(false);
                });
            });


        // When the info dialog visibility is set to true, open the dialog
        this.dialogState.isEditorTypeChangeConfirmationDialogVisible$
            .pipe(filter(isVisible => !!isVisible))
            .subscribe(() => {
                this.dialog.open(ConfirmEditorDialog, {
                    width: "450px",
                    disableClose: true,
                });
            });

        const language = localStorage.getItem('currentLanguage');
        if (language) {
            //console.log('Language is set to ' + language);
        } else {
            const languageDialogRef = this.dialog.open(LanguageSelectDialog, {
                width: '450px',
                disableClose: true,
            });

            languageDialogRef.afterClosed().subscribe(() => {
                this.dialog.open(CreditsDialog, {
                    width: '800px',
                    disableClose: true,
                });
            });
        }
    }
}
