var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const hacktoberfestStartDate = new Date('2023-10-01T00:00:00Z');
const hacktoberfestEndDate = new Date('2023-10-31T23:59:59Z');
function fetchPullRequests(url, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(url, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.error(`Failed to fetch pull requests. Status code: ${response.status}`);
                return null;
            }
        }
        catch (error) {
            console.error('An error occurred while fetching pull requests:', error.message);
            return null;
        }
    });
}
function countPullRequestsForUserAndRepo(username, repo, access_token, labels = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const mergedPullRequestsUrl = `https://api.github.com/search/issues?q=is:pr+is:merged+author:${username}+created:${hacktoberfestStartDate.toISOString()}..${hacktoberfestEndDate.toISOString()}+repo:${repo.owner}/${repo.name}+${labels.map(label => `label:${label.label_type}`).join('+')}`;
        const [mergedPullRequestsData] = yield Promise.all([
            fetchPullRequests(mergedPullRequestsUrl, access_token),
        ]);
        if (mergedPullRequestsData) {
            return [mergedPullRequestsData];
        }
    });
}
export default countPullRequestsForUserAndRepo;
