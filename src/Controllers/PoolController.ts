export interface Choice {
    label: string,
    people: number,
};

export interface Pool {
    id: number,
    title: string,
    choices: Choice[],
};

const votationPool: Pool[] = [];
export default votationPool;