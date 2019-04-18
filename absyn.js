/* global SLang : true */

(function () {

    "use strict";

    var exports = {};

    function createProgram(e) {
        return ["Program", e];
    }
    function isProgram(e) {
        return e[0] === "Program";
    }
    function getProgramExp(e) {
        if (isProgram(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getProgramExp is not a program.");
        }
    }
    function createVarExp(v) {
        return ["VarExp", v];
    }
    function isVarExp(e) {
        return e[0] === "VarExp";
    }
    function getVarExpId(e) {
        if (isVarExp(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getVarExpId is not a VarExp.");
        }
    }
    function createIntExp(n) {
        return ["IntExp", parseInt(n)];
    }
    function isIntExp(e) {
        return e[0] === "IntExp";
    }
    function getIntExpValue(e) {
        if (isIntExp(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getIntExpValue is not an IntExp.");
        }
    }
    function createFnExp(params, body) {
        return ["FnExp", params, body];
    }
    function isFnExp(e) {
        return e[0] === "FnExp";
    }
    function getFnExpParams(e) {
        if (isFnExp(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getFnExpParams is not an FnExp.");
        }
    }
    function getFnExpBody(e) {
        if (isFnExp(e)) {
            return e[2];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getFnExpBody is not an FnExp.");
        }
    }
    function createAppExp(fn, args) {
        return ["AppExp", fn, args];
    }
    function isAppExp(e) {
        return e[0] === "AppExp";
    }
    function getAppExpFn(e) {
        if (isAppExp(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getAppExpFn is not an AppExp.");
        }
    }
    function getAppExpArgs(e) {
        if (isAppExp(e)) {
            return e[2].slice(1); // eliminate the first element (i.e., "args")
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getAppExpArgs is not an AppExp.");
        }
    }
    function createPrimAppExp1(prim, args) {
        return ["PrimAppExp1", prim, args];
    }
    function isPrimAppExp1(e) {
        return e[0] === "PrimAppExp1";
    }
    function getPrimAppExpPrim1(e) {
        if (isPrimAppExp1(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getPrimAppExpPrim1 is not a PrimAppExp1.");
        }
    }
    function getPrimAppExpArgs1(e) {
        if (isPrimAppExp1(e)) {
            return e[2];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getPrimAppExpArgs1 is not a PrimAppExp1.");
        }
    }

    function createPrimAppExp2(prim, args) {
        return ["PrimAppExp2", prim, args];
    }
    function isPrimAppExp2(e) {
        return e[0] === "PrimAppExp2";
    }
    function getPrimAppExpPrim2(e) {
        if (isPrimAppExp2(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getPrimAppExpPrim2 is not a PrimAppExp2.");
        }
    }
    function getPrimAppExpArgs2(e) {
        if (isPrimAppExp2(e)) {
            return e[2];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getPrimAppExpArgs2 is not a PrimAppExp2.");
        }
    }
    function createListExp(ints) {
        return ["List", ints];
    }
    function isListExp(e) {
        return e[0] == "List";
    }
    function getListExpList(e) {
        if (isListExp(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: " +
                "The argument of getListExpList is not a ListExp.");
        }
    }
    function createBool(n) {
        return ["Bool",n];
    }
    function isBool(value) {
        return value[0] === "Bool";
    }
    function getBoolValue(value) {
        if (isNum(value)) {
        return value[1];
        } else {
        throw new Error("Interpreter error: "  +
                "The argument of getNumValue is not a Num value.");
        }
    }    
    exports.isBool = isBool;
    exports.getBoolValue = getBoolValue;
    exports.createBool = createBool;
    exports.createListExp = createListExp;
    exports.isListExp = isListExp;
    exports.getListExpList = getListExpList;
    exports.createProgram = createProgram;
    exports.isProgram = isProgram;
    exports.getProgramExp = getProgramExp;
    exports.createVarExp = createVarExp;
    exports.isVarExp = isVarExp;
    exports.getVarExpId = getVarExpId;
    exports.createIntExp = createIntExp;
    exports.isIntExp = isIntExp;
    exports.getIntExpValue = getIntExpValue;
    exports.createFnExp = createFnExp;
    exports.isFnExp = isFnExp;
    exports.getFnExpParams = getFnExpParams;
    exports.getFnExpBody = getFnExpBody;
    exports.createAppExp = createAppExp;
    exports.isAppExp = isAppExp;
    exports.getAppExpFn = getAppExpFn;
    exports.getAppExpArgs = getAppExpArgs;
    exports.createPrimAppExp1 = createPrimAppExp1;
    exports.isPrimAppExp1 = isPrimAppExp1;
    exports.getPrimAppExpPrim1 = getPrimAppExpPrim1;
    exports.getPrimAppExpArgs1 = getPrimAppExpArgs1;
    exports.createPrimAppExp2 = createPrimAppExp2;
    exports.isPrimAppExp2 = isPrimAppExp2;
    exports.getPrimAppExpPrim2 = getPrimAppExpPrim2;
    exports.getPrimAppExpArgs2 = getPrimAppExpArgs2;

    window.SLang.absyn = exports;
}());