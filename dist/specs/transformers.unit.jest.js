"use strict";
describe("Transforms", function () {
    describe("With time series data", function () {
    });
    describe("With elasticsearch data", function () {
        it("Can convert to hexbin", function () {
            expect(true).toBeTruthy();
        });
    });
    describe("With Table data", function () {
        var tableData = [{
                columns: [
                    {
                        text: "Time",
                        type: "time"
                    }, {
                        text: "xitem"
                    }, {
                        text: "yitem"
                    }, {
                        text: "nonitem"
                    }
                ],
                rows: [
                    [1492759673649, 20, 15, "ignore2"]
                ],
                type: "table"
            }];
        it("Converts Table Data", function () {
            console.log(tableData);
        });
    });
    describe("With JSON data", function () {
        it("Can convert to hexbin", function () {
            var rawData = [
                {
                    type: "docs",
                    datapoints: [
                        {
                            timestamp: "time",
                            message: "message",
                            nested: {
                                level2: "level2-value"
                            }
                        }
                    ]
                }
            ];
            console.log(rawData);
            expect(true).toBeTruthy();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtZXJzLnVuaXQuamVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGVjcy90cmFuc2Zvcm1lcnMudW5pdC5qZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUF5QkEsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUVyQixRQUFRLENBQUMsdUJBQXVCLEVBQUU7SUE0QmxDLENBQUMsQ0FBQyxDQUFDO0lBR0gsUUFBUSxDQUFDLHlCQUF5QixFQUFFO1FBQ2xDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRTtZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUdILFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFNLFNBQVMsR0FBRyxDQUFDO2dCQUNqQixPQUFPLEVBQUU7b0JBQ1A7d0JBQ0UsSUFBSSxFQUFFLE1BQU07d0JBQ1osSUFBSSxFQUFFLE1BQU07cUJBQ2IsRUFBRTt3QkFDRCxJQUFJLEVBQUUsT0FBTztxQkFDZCxFQUFFO3dCQUNELElBQUksRUFBRSxPQUFPO3FCQUNkLEVBQUU7d0JBQ0QsSUFBSSxFQUFFLFNBQVM7cUJBQ2hCO2lCQUNGO2dCQUNELElBQUksRUFBRTtvQkFDSixDQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQztpQkFDbkM7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87YUFDZCxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMscUJBQXFCLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQStCUCxDQUFDLENBQUMsQ0FBQztJQUdELFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixFQUFFLENBQUMsdUJBQXVCLEVBQUU7WUFDMUIsSUFBSSxPQUFPLEdBQUc7Z0JBQ1o7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osVUFBVSxFQUFFO3dCQUNaOzRCQUNFLFNBQVMsRUFBRSxNQUFNOzRCQUNqQixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsTUFBTSxFQUFFO2dDQUNOLE1BQU0sRUFBRSxjQUFjOzZCQUN2Qjt5QkFDRjtxQkFDRjtpQkFDRjthQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogVGVzdHMgZm9yIHRyYW5zZm9ybXNcbiAqL1xuXG4vL2ltcG9ydCB7VGltZVNlcmllc30gZnJvbSBcIi4uLy4uL3Rlc3RzL3RpbWVzZXJpZXNcIjtcblxuLy8gSGVscGVyIGNsYXNzXG4vKlxuY2xhc3MgVGltZVNlcmllcyB7XG4gIGRhdGFwb2ludHM6IG51bWJlcltdW107XG4gIGFsaWFzOiBzdHJpbmc7XG4gIHRhcmdldDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihvcHRzOiB7ZGF0YXBvaW50czogbnVtYmVyW11bXSwgYWxpYXM6IHN0cmluZ30pIHtcbiAgICB0aGlzLmRhdGFwb2ludHMgPSBvcHRzLmRhdGFwb2ludHM7XG4gICAgdGhpcy5hbGlhcyA9IG9wdHMuYWxpYXM7XG4gICAgdGhpcy50YXJnZXQgPSBvcHRzLmFsaWFzO1xuICB9XG59XG4qL1xuLy9pbXBvcnQge1RyYW5zZm9ybWVyc30gZnJvbSBcIi4uL3NyYy90cmFuc2Zvcm1lcnNcIjtcbi8vaW1wb3J0IHtQb2x5c3RhdE1vZGVsfSBmcm9tIFwiLi4vc3JjL3BvbHlzdGF0bW9kZWxcIjtcbi8vIGdldCB0aGlzIHdvcmtpbmcuLi5cbi8vaW1wb3J0IFwiYXBwL2NvcmUvdGltZV9zZXJpZXMyXCI7XG5cbmRlc2NyaWJlKFwiVHJhbnNmb3Jtc1wiLCAoKSA9PiB7XG4gICAgLy8gRGF0YXNvdXJjZSBzZW5kcyB0aW1lc2VyaWVzXG4gIGRlc2NyaWJlKFwiV2l0aCB0aW1lIHNlcmllcyBkYXRhXCIsICgpID0+IHtcbiAgICAvKlxuICAgIGxldCB4QXhpc1NlcmllczogVGltZVNlcmllcztcbiAgICBsZXQgeUF4aXNTZXJpZXM6IFRpbWVTZXJpZXM7XG5cbiAgICBsZXQgaGV4YmluOiBQb2x5c3RhdE1vZGVsO1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHhBeGlzU2VyaWVzID0gbmV3IFRpbWVTZXJpZXMoe1xuICAgICAgICBkYXRhcG9pbnRzOiBbWzIwMCwgdGltZV0sIFsxMDEsIHRpbWUgKyAxXSwgWzU1NSwgdGltZSArIDJdXSxcbiAgICAgICAgYWxpYXM6IFwiQS1zZXJpZXNcIixcbiAgICAgIH0pO1xuICAgICAgeUF4aXNTZXJpZXMgPSBuZXcgVGltZVNlcmllcyh7XG4gICAgICAgIGRhdGFwb2ludHM6IFtbODg4LCB0aW1lXSwgWzc3NywgdGltZSArIDFdLCBbNDQ0LCB0aW1lICsgMl1dLFxuICAgICAgICBhbGlhczogXCJCLVNlcmllc1wiLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgKi9cbiAgICAvKlxuICAgIGl0KFwiQ2FuIGNvbnZlcnQgdG8gaGV4YmluXCIsIGFzeW5jKCkgPT4ge1xuICAgICAgbGV0IGJpbnMgPSBUcmFuc2Zvcm1lcnMuVGltZVNlcmllc1RvSGV4YmluKHhBeGlzU2VyaWVzLCB5QXhpc1Nlcmllcyk7XG4gICAgICBjb25zb2xlLmxvZyhiaW5zKTtcbiAgICAgIGV4cGVjdChiaW5zLnNlcmllc1swXVswXSkudG9FcXVhbCgyMDApO1xuICAgICAgZXhwZWN0KGJpbnMuc2VyaWVzWzBdWzFdKS50b0VxdWFsKDg4OCk7XG4gICAgICBleHBlY3QoYmlucy5zZXJpZXNbMl1bMF0pLnRvRXF1YWwoNTU1KTtcbiAgICAgIGV4cGVjdChiaW5zLnNlcmllc1syXVsxXSkudG9FcXVhbCg0NDQpO1xuICAgIH0pO1xuICAgICovXG4gIH0pO1xuXG4gIC8vIERhdGFzb3VyY2Ugc2VuZHMgRWxhc3RpY1NlYXJjaCByZXN1bHRzXG4gIGRlc2NyaWJlKFwiV2l0aCBlbGFzdGljc2VhcmNoIGRhdGFcIiwgKCkgPT4ge1xuICAgIGl0KFwiQ2FuIGNvbnZlcnQgdG8gaGV4YmluXCIsICgpID0+IHtcbiAgICAgIGV4cGVjdCh0cnVlKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIERhdGFzb3VyY2Ugc2VuZHMgYSB0YWJsZVxuICBkZXNjcmliZShcIldpdGggVGFibGUgZGF0YVwiLCAoKSA9PiB7XG4gICAgY29uc3QgdGFibGVEYXRhID0gW3tcbiAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiVGltZVwiLFxuICAgICAgICAgIHR5cGU6IFwidGltZVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB0ZXh0OiBcInhpdGVtXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgIHRleHQ6IFwieWl0ZW1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgdGV4dDogXCJub25pdGVtXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHJvd3M6IFtcbiAgICAgICAgWzE0OTI3NTk2NzM2NDksIDIwLCAxNSwgXCJpZ25vcmUyXCJdXG4gICAgICBdLFxuICAgICAgdHlwZTogXCJ0YWJsZVwiXG4gICAgfV07XG4gICAgaXQoXCJDb252ZXJ0cyBUYWJsZSBEYXRhXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHRhYmxlRGF0YSk7XG4gICAgfSk7XG4gICAgLypcbiAgICBpdChcIkNhbiBjb252ZXJ0IHggYW5kIHkgaXRlbXMgdG8gaGV4YmluXCIsIGFzeW5jKCkgPT4ge1xuICAgICAgbGV0IHhDb2x1bW4gPSAxO1xuICAgICAgbGV0IHlDb2x1bW4gPSAyO1xuICAgICAgbGV0IGJpbnMgPSBUcmFuc2Zvcm1lcnMuVGFibGVEYXRhVG9IZXhiaW4odGFibGVEYXRhLCB4Q29sdW1uLCB5Q29sdW1uKTtcbiAgICAgIGNvbnNvbGUubG9nKGJpbnMpO1xuICAgICAgZXhwZWN0KGJpbnMuc2VyaWVzWzBdWzBdKS50b0VxdWFsKDIwKTtcbiAgICAgIGV4cGVjdChiaW5zLnNlcmllc1swXVsxXSkudG9FcXVhbCgxNSk7XG4gICAgfSk7XG4gICAgKi9cbiAgICAvKlxuICAgIGl0KFwiQ2FuIGNvbnZlcnQgeCBhbmQgdGltZSBpdGVtcyB0byBoZXhiaW5cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHhDb2x1bW4gPSAwO1xuICAgICAgbGV0IHlDb2x1bW4gPSAxO1xuICAgICAgbGV0IGJpbnMgPSBUcmFuc2Zvcm1lcnMuVGFibGVEYXRhVG9IZXhiaW4odGFibGVEYXRhLCB4Q29sdW1uLCB5Q29sdW1uKTtcbiAgICAgIGNvbnNvbGUubG9nKGJpbnMpO1xuICAgICAgZXhwZWN0KGJpbnMuc2VyaWVzWzBdWzBdKS50b0VxdWFsKDE0OTI3NTk2NzM2NDkpO1xuICAgICAgZXhwZWN0KGJpbnMuc2VyaWVzWzBdWzFdKS50b0VxdWFsKDIwKTtcbiAgICB9KTtcbiAgICAqL1xuICAgIC8qXG4gICAgaXQoXCJDYW4gY29udmVydCB5IGFuZCB0aW1lIGl0ZW1zIHRvIGhleGJpblwiLCBhc3luYygpID0+IHtcbiAgICAgIGxldCB4Q29sdW1uID0gMDtcbiAgICAgIGxldCB5Q29sdW1uID0gMjtcbiAgICAgIGxldCBiaW5zID0gVHJhbnNmb3JtZXJzLlRhYmxlRGF0YVRvSGV4YmluKHRhYmxlRGF0YSwgeENvbHVtbiwgeUNvbHVtbik7XG4gICAgICBjb25zb2xlLmxvZyhiaW5zKTtcbiAgICAgIGV4cGVjdChiaW5zLnNlcmllc1swXVswXSkudG9FcXVhbCgxNDkyNzU5NjczNjQ5KTtcbiAgICAgIGV4cGVjdChiaW5zLnNlcmllc1swXVsxXSkudG9FcXVhbCgxNSk7XG4gICAgfSk7XG4gICAgKi9cbn0pO1xuXG4gIC8vIERhdGFzb3VyY2Ugc2VuZHMgSlNPTlxuICBkZXNjcmliZShcIldpdGggSlNPTiBkYXRhXCIsICgpID0+IHtcbiAgICBpdChcIkNhbiBjb252ZXJ0IHRvIGhleGJpblwiLCAoKSA9PiB7XG4gICAgICBsZXQgcmF3RGF0YSA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwiZG9jc1wiLFxuICAgICAgICAgIGRhdGFwb2ludHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IFwidGltZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBuZXN0ZWQ6IHtcbiAgICAgICAgICAgICAgbGV2ZWwyOiBcImxldmVsMi12YWx1ZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XTtcbiAgICAgIGNvbnNvbGUubG9nKHJhd0RhdGEpO1xuICAgICAgZXhwZWN0KHRydWUpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==