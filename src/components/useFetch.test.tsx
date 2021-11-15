import { renderHook } from '@testing-library/react-hooks'
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useFetch from "./useFetch";

let mockedArticles = [{name: "cnn"}];


describe("useFetch (Custom Hook)", () => {
    test("should load and then return data", async() => {
        const mock = new MockAdapter(axios);
        const url = "http://test.com/api/getArticles";
        mock.onGet(url).reply(200, mockedArticles);

        const { result, waitForNextUpdate } = renderHook(() => useFetch("http://test.com/api/getArticles"));

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.data).toBeNull();

        await waitForNextUpdate();

        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.data).toEqual(mockedArticles);
        expect
    });

    test("should set error to \"true\" upon an error", async() => {
        const mock = new MockAdapter(axios);
        const url = "http://test.com/api/getArticles";
        mock.onGet(url).networkError();

        const { result, waitForNextUpdate } = renderHook(() => useFetch("http://test.com/api/getArticles"));

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.data).toBeNull();

        await waitForNextUpdate();

        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.isError).toBeTruthy();
        expect(result.current.data).toBeNull();
        expect
    });
});