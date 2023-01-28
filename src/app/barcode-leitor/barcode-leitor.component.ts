import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CosmosBluesoftService } from '../servicos/cosmos-bluesoft.service';

@Component({
  selector: 'app-barcode-leitor',
  templateUrl: './barcode-leitor.component.html',
  styleUrls: ['./barcode-leitor.component.css']
})
export class BarcodeLeitorComponent implements OnInit {


  constructor(
    private formBuild: FormBuilder,
    private snackBar: MatSnackBar,
    private serviceBlueSoft: CosmosBluesoftService
  ) { }

  formulario: FormGroup | any;

  ngOnInit(): void {
    this.montarFormulario();
  }

  montarFormulario() {
    //  const formulario: FormGroup 
    this.formulario = this.formBuild.group({
      code_bar: ['', Validators.required]
    })
  }



  detalhesNcm() {
    if (this.qrResultString) {
      console.log("as");

      this.serviceBlueSoft
        .obterHtmlCosmosBluesoft('7896112164784')
        .subscribe(resposta => {
          console.log("Sucesso");
          console.log(resposta);
        }
        )

    } else {
      this.snackBar.open("INFO", "O Código de Barras deve ser informado!", {
        duration: 2000
      });
    }
  }


  //////////////////////////////////////////////
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];


  hasDevices: boolean = false;
  hasPermission: boolean = false;

  qrResultString: string = '';

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  clearResult(): void {
    this.qrResultString = '';
  }


  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

}
