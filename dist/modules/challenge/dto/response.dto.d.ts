import { PaginationResponse } from 'src/common/types';
import { Challenge } from 'src/models/challenge.model';
export declare class GetChallengeResponse extends PaginationResponse {
    data: Challenge[];
}
