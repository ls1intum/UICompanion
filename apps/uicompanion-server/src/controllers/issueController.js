"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueController = void 0;
const IssueMetadataModel_1 = require("../model/IssueMetadataModel");
class IssueController {
    // getIssues function for GET /api/issues
    getIssues(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield IssueMetadataModel_1.IssueMetadataModel.find();
            res.json({ issues });
        });
    }
    // createIssue function for POST /api/issues
    createIssue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newIssue = new IssueMetadataModel_1.IssueMetadataModel(req.body);
            console.log("New issue:", newIssue);
            const createdIssue = yield newIssue.save();
            if (!createdIssue) {
                console.log("Issue could not be saved");
                res.status(400).send();
            }
            else {
                console.log("Issue saved successfully");
                res.status(200).send(createdIssue);
            }
        });
    }
    // updateIssue function for PATCH /api/issues/:number
    updateIssue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const issueNumber = req.params.number;
            const updateData = req.body;
            try {
                const updatedIssue = yield IssueMetadataModel_1.IssueMetadataModel.findOneAndUpdate({ number: issueNumber }, updateData, { new: true });
                if (!updateData) {
                    console.log("Issue not found");
                    res.status(404).send();
                }
                else {
                    console.log("Issue updated successfully");
                    res.status(200).send(updatedIssue);
                }
            }
            catch (error) {
                console.error("Error updating issue:", error);
                res.status(500).send();
            }
        });
    }
}
exports.IssueController = IssueController;
