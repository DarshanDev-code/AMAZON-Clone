import {FormatCurrency} from "../../JS Files/functions.js"

describe('Test Suite: FormatCurrency',()=>{
    it('Convert cents into dollars',()=>{
        expect(FormatCurrency(2095)).toEqual('20.95')
    })
    it('Works with 0',()=>{
        expect(FormatCurrency(0)).toEqual('0.00')
    })
    it('Rounds up to nearest cents',()=>{
        expect(FormatCurrency(2000.5)).toEqual('20.01')
    })
})