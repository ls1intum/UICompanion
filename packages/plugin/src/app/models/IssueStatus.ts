export enum IssueStatus {
    OPEN = 'Open',
    IN_PROGRESS = 'In Progress',
    IN_REVIEW = 'In Review',
    APPROVED = 'Approved'
}

export const issueStatusToIndex: Record<IssueStatus, number> = {
    [IssueStatus.OPEN]: 0,
    [IssueStatus.IN_PROGRESS]: 1,
    [IssueStatus.IN_REVIEW]: 2,
    [IssueStatus.APPROVED]: 3
};