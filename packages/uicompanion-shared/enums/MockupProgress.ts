enum MockupProgress {
    OPEN = 'Open',
    IN_PROGRESS = 'In Progress',
    IN_REVIEW = 'In Review',
    APPROVED = 'Approved'
}

const mockupProgressToIndex: Record<MockupProgress, number> = {
    [MockupProgress.OPEN]: 0,
    [MockupProgress.IN_PROGRESS]: 1,
    [MockupProgress.IN_REVIEW]: 2,
    [MockupProgress.APPROVED]: 3
};

export default MockupProgress;
export { mockupProgressToIndex };