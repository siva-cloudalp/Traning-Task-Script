/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */

/*
* Script Name : CA - CL - Set Memo Field
* Script Type : ClientScript - pageInit
* Description : This script is used to set memo filed value from copy recorded
* Script Owner: SK
* Date        : 25-06-24
* Company     :CloudAlp
*/

const MEMO = 'memo';
define([], function (

) {

  function getUrlParams(searchUrl, param) {
    //The URLSearchParams interface defines utility methods to work with the query string of a URL.
    // reference : https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const urlParam = new URLSearchParams(searchUrl);
    return urlParam.get(param);
  }

  function setMemo(contx) {
    let customer = contx.getText({ fieldId: 'entity' });
    let stUrl = window.location.search;
    const recId = getUrlParams(stUrl, "id");
    const strVal = ` Copied From ${recId} By ${customer}`;
    strVal ? contx.setValue({ fieldId: MEMO, value: strVal }) : "";
  }

  function pageInit(context) {
    let recSO = context.currentRecord;
    try {
      (context.mode == 'copy') ? setMemo(recSO) : "";
    } catch (error) {
      log.error('CA Error', error);
    }
  }

  function lineInit(context) {
    let recSO = context.currentRecord;
    try {
      if (context.sublistId == 'item') {
        let ItemRate = recSO.getCurrentSublistValue({
          sublistId: 'item',
          fieldId: 'rate'
        });
        log.debug("ItemRate", ItemRate);
      }

    } catch (error) {
      log.error('Line Item Error', 'Error');
    }
  }

  function fieldChanged(context) {
    try {

      (context.fieldId == 'entity') ? setMemo(context.currentRecord) : -1;

    } catch (error) {
      log.error('fieldChanged Error', error);
    }
  }
  return {
    pageInit: pageInit,
    fieldChanged: fieldChanged,
    lineInit: lineInit
  };
});