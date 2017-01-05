/**
 * Created by jevgenir on 12/11/2016.
 */

/*
 * Logic for asynchronous and synchronous requests that need JavaScripts help.
 */
var ee = ee == undefined ? {} : ee;
ee.sk = ee.sk == undefined ? {} : ee.sk;
ee.sk.hashcode = ee.sk.hashcode == undefined ? {} : ee.sk.hashcode;
var signatureLogic = {};

setTimeout(function () {
  "use strict";

  ee.sk.hashcode = {
    // StartMobileSign: function(sessionCode) {
    //   /// <summary>
    //   /// Mobiil-ID-ga allkirjastamine.
    //   /// </summary>
    //
    //   $('#mobileSignErrorContainer').hide();
    //   var phoneNo = jQuery('#mid_PhoneNumber').val();
    //   var idCode = jQuery('#mid_idCode').val();
    //   if (!phoneNo) {
    //     $('#mobileSignErrorContainer')
    //       .html('Phone number is mandatory!')
    //       .show();
    //   } else if (!idCode) {
    //     $('#mobileSignErrorContainer')
    //       .html('Social security number is mandatory!')
    //       .show();
    //   } else {
    //     // TODO: PHP-le kirjutatud meetod. Muuta, et oleks subform.submit või jquery ajax päring, või kustutada. - jevgeni
    //     jQuery.post(
    //       '',
    //       {
    //         request_act: 'MID_SIGN',
    //         phoneNo: phoneNo,
    //         idCode: idCode,
    //         subAct: 'START_SIGNING'
    //       }
    //     ).done(function(resp) {
    //       if (resp["error_message"]) {
    //         jQuery('#mobileSignErrorContainer').html('There was an error initiating ' +
    //           'MID signing: ' + resp['error_message'])
    //         jQuery('#mobileSignErrorContainer').show();
    //       } else {
    //         jQuery('#mobileSignModalHeader').hide();
    //         jQuery('#mobileSignModalFooter').hide();
    //         var challenge = resp['challenge'];
    //         jQuery('.mobileSignModalContent').html('<table><tr><td style="width: 75%;">' +
    //           '<h4>Sending digital signing request to phone is in progress ...</h4>' +
    //           '<p style="font-size: 12px;">Make sure control code matches with one in the phone screen and enter Mobile-ID PIN2. ' +
    //           'After you enter signing PIN, a digital signature is created to the document, which may bind you to legal liabilities. ' +
    //           'You must therefore agree to the content of the document. When in doubt, please go back and check document contents.</p></td>' +
    //           '<td style="vertical-align: middle; text-align: center;">' +
    //           'Control code:' +
    //           '<h2>' + challenge + '</h2>' +
    //           '</td></tr></table>');
    //         var intervalId = setInterval(function() {
    //           jQuery.post(
    //             '',
    //             {
    //               request_act: 'MID_SIGN',
    //               subAct: 'GET_SIGNING_STATUS'
    //             }
    //           ).done(function(statusResp) {
    //             if (!!statusResp["is_success"] === true) {
    //               clearInterval(intervalId);
    //             } else if (!!statusResp['error_message']) {
    //               clearInterval(intervalId);
    //             }
    //           }).fail(function(data) {
    //             clearInterval(intervalId);
    //           });
    //         }, 3000);
    //       }
    //     }).fail(function(data) {
    //       jQuery('#mobileSignErrorContainer').html('There was an error performing AJAX request to initiate ' +
    //         'MID signing: ' + data.status + '-' + data.statusText);
    //       jQuery('#mobileSignErrorContainer').show();
    //     });
    //   }
    //
    // },

    IDCardSign: function(docId, role, urlPrefix, callback) {
      /// <summary>
      /// Allkirjastamise esimene samm.
      /// ID kaardiga allkirjastamise operatsioon.
      /// </summary>
      /// <param name="sessionCode">DigiDocService-i sessiooni kood.</param>
      /// <param name="urlPrefix">/Area/Controller - paindlikkuse jaoks, et oleks võimalik kutsuda ka erineva loogikaga digidoc-ga seotud actioneid</param>

      var self = this;
      var lang = "en";

      // Tuleb hüpikaken isiku andmetega; ID kaart peab olema selleks hetkeks sisestatud.
      window.hwcrypto.getCertificate({ lang: lang }).then(function(cert) {
        var idSignCreateHashReqParams = self.prepareSigningParameters(cert);
        //idSignCreateHashReqParams['sessionCode'] = sessionCode;
        idSignCreateHashReqParams['id'] = docId;
        console.log(idSignCreateHashReqParams);

        var jqxhr = $.post(urlPrefix + '/PrepareSignature', {
          id: docId,
          hex: idSignCreateHashReqParams.signersCertificateHEX,
          role: role
        });

        jqxhr.success(function(statusResp) {
          self.hashCreateResponseHandler(docId, role, statusResp.sessionCode, statusResp, lang, cert, urlPrefix, callback);
        });

        jqxhr.fail(function(data) {
          if (data && data.status && data.statusText)
            alert(data.status + " - " + data.statusText);
          else
            alert('Unknown error occured');
          signatureLogic.failAction("FAIL");
        });
      }, function(reason) {
        console.log('error occured when getting certificate');
        self.errorHandler(reason.message);
        signatureLogic.failAction("FAIL");
      });

    },

    hashCreateResponseHandler: function(docId, role, sessionCode, statusResp, lang, cert, urlPrefix, callback) {
      /// <summary>
      /// Allkirjastamise teine samm.
      /// Krüpteerib sha-xxx algoritmiga isiku sertifikaadi võtme.
      /// </summary>
      /// <param name="docId">(Process)ContractDocument ID</param>
      /// <param name="role">DigiSigner</param>
      /// <param name="sessionCode">Avatud sessiooni koood</param>
      /// <param name="statusResp">Vastus PrepareSignature Actionilt</param>
      /// <param name="lang"></param>
      /// <param name="cert"></param>
      /// <param name="urlPrefix"></param>
      /// <param name="callback"></param>


      var self = this;
      if (statusResp["success"] === true) {
        var signatureDigest = statusResp['signature_info_digest'],
          signatureId = statusResp['signature_id'],
          signatureHashType = statusResp['signature_hash_type'];

        // Tuleb hüpikaken, kus küsitakse PIN2; ID-kaart peab olema selleks ajaks sisestatud.
        window.hwcrypto.sign(cert, { hex: signatureDigest, type: signatureHashType }, { lang: lang })
          .then(function(signature) {
            console.log("signature.hex");
            console.log(signature.hex);

            var jqxhr = $.post(urlPrefix + '/FinalizeSignature', {
              requestAct: 'ID_SIGN_COMPLETE',
              id: docId,
              role: role,
              sessionCode: sessionCode,
              signatureId: signatureId,
              signatureValue: signature.hex
            });

            jqxhr.done(function(result) {
              if (callback && typeof (callback) === "function") {
                console.log(result);
                callback(result.sessionCode);
              }
            });

            jqxhr.fail(function() {
              signatureLogic.failAction("Tekkis viga allkirja kinnitamisel.");
            });
          }, function(reason) {
            signatureLogic.failAction("Tekkis viga allkirja kinnitamisel:" + reason);
          });
      } else if (!!statusResp['error_message']) {
        signatureLogic.failAction("FAIL");
      } else {
        signatureLogic.failAction("Viga on milleski muus (süsteemi sisemine viga).");
      }
    },

    prepareSigningParameters: function(cert) {
      /// <summary>
      /// Allkirjastamise esimese sammu jaoks võimalikud parameetrid.
      /// cert.hex - vajalik (sertifikaadi hex string)
      /// </summary>
      /// <param name="cert"></param>
      /// <returns type=""></returns>

      var role = $('#idSignRole').val(),
        city = $('#idSignCity').val(),
        state = $('#idSignState').val(),
        postalCode = $('#idSignPostalCode').val(),
        country = $('#idSignCountry').val();

      var idSignCreateHashReqParams = {
        request_act: 'ID_SIGN_CREATE_HASH',
        signersCertificateHEX: cert.hex
      };

      if (role) {
        idSignCreateHashReqParams.signersRole = role;
      }

      if (city) {
        idSignCreateHashReqParams.signersCity = city;
      }

      if (state) {
        idSignCreateHashReqParams.signersState = state;
      }

      if (postalCode) {
        idSignCreateHashReqParams.signersPostalCode = postalCode;
      }

      if (country) {
        idSignCreateHashReqParams.signersCountry = country;
      }

      return idSignCreateHashReqParams;
    },


    errorHandler: function(reason) {
      /// <summary>
      /// ID card signing methods
      /// Please read: https://github.com/open-eid/js-token-signing/wiki/ModernAPI
      ///
      /// There You will have very good overview of API and much more compact example of signing using JavaScript
      /// </summary>
      /// <param name="reason"></param>

      var longMessage = 'ID-card siging: ';

      console.log('inside error handler');
      var hwcrypto = window.hwcrypto;
      switch (reason.message) {

        case 'no_backend':
          longMessage += 'Cannot find ID-card browser extensions';
          break;
        case hwcrypto.USER_CANCEL:
          longMessage += 'Signing canceled by user';
          break;
        case hwcrypto.INVALID_ARGUMENT:
          longMessage += 'Invalid argument';
          break;
        case hwcrypto.NO_CERTIFICATES_FOUND:
          longMessage += ' Failed reading ID-card certificates make sure. ' +
            'ID-card reader or ID-card is inserted correctly';
          break;
        case hwcrypto.NO_IMPLEMENTATION:
          longMessage += ' Please install or update ID-card Utility or install missing browser extension. ' +
            'More information about on id.installer.ee';
          break;
        case hwcrypto.TECHNICAL_ERROR:
        default:
          longMessage += 'Unknown technical error occurred';
      }


      // Hide loader
      $(".loader").remove();
      $("#my_loader").remove();

      // Print message
      console.error(longMessage);
      alert(longMessage);

      console.log('exiting error handler...');
    }
  };

  signatureLogic = {
    startSignatureProcess: function(docId, role, areaController) {
      /// <summary>
      /// Allkirjastamise protsessi alustamine. Järgmisena peaks ekraani keskele aken välja lendama
      /// </summary>

      // this.showLoader();

      try {
        ee.sk.hashcode.IDCardSign(docId, role, areaController, this.redirectSubform);
      } catch (e) {
        this.failAction(e);
      }
    },

    markExternallySigned: function(url, docId, role) {
      /// <summary>
      /// Lihtsalt märgi, et dokument on allkirjastatud ETIS-est väljaspoolt
      /// </summary>

      // this.showLoader();

      var markSignedDocPromise = $.post(url, { id: docId, role: role });

      var self = this;
      markSignedDocPromise.done(self.redirectSubform);
      markSignedDocPromise.fail(self.failAction);
    },

    // redirectSubform: function() {
    //   window.location.reload();
    // },

    failAction: function(message) {
      //this.hideLoader();
      var prefix = message ? ": " : "";
      alert('error occured' + prefix + message);
    },
    //
    // showLoader: function() {
    //   $("#digisign_inner").append('<div class=\"block\" id=\"my_loader\"><div class=\"loader\"></div></div>');
    //   //$("#digisign_inner").append('Loading...');
    // },
    // hideLoader: function() {
    //   $(".loader").remove();
    //   $("#my_loader").remove();
    // }
  };
});
