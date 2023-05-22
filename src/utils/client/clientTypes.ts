export interface Client{
    name: String;
    email: String;
    dob: String;
    status: Active | Pending | Blocked;
};

export type Active='ACTIVE';

export type Pending='PENDING';

export type Blocked='BLOCKED';