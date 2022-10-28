import * as should from "should"

import "mocha"
import "./Number"

describe("Prototype extensions: Number", () => {
	describe("padStart()", () => {
		const tests: {
			value: number
			length: number
			padWith?: string
			expected: string
		}[] = [
			{
				value: 0,
				length: -1,
				expected: "0",
			},
			{
				value: 0,
				length: 0,
				expected: "0",
			},
			{
				value: 0,
				length: 1,
				expected: "0",
			},
			{
				value: 0,
				length: 2,
				expected: "00",
			},
			{
				value: 234,
				length: 10,
				expected: "0000000234",
			},
			{
				value: 42,
				padWith: "fuck",
				length: 12,
				expected: "fuckfuckfu42",
			},
			{
				value: 228,
				padWith: "",
				length: 12,
				expected: "228",
			},
		]

		tests.forEach((test, i) => {
			const { value, length, padWith, expected } = test
			it(`Case ${i + 1}, pad ${value} to ${length} with "${typeof padWith == "undefined" ? "0" : padWith}"`, done => {
				should(value.padStart(length, padWith))
					.be.exactly(expected)

				done()
			})
		})
	})

	describe("limit()", () => {
		const tests: {
			value: number
			min: number
			max: number
			expected: number
		}[] = [
			{
				value: 1,
				min: 0,
				max: 0,
				expected: 0,
			},
			{
				value: 1,
				min: 0,
				max: -1,
				expected: -1,
			},
			{
				value: 1,
				min: 0,
				max: 1,
				expected: 1,
			},
			{
				value: 1,
				min: 2,
				max: 3,
				expected: 2,
			},
			{
				value: 1,
				min: 0,
				max: 2,
				expected: 1,
			},
			{
				value: 10,
				min: 1,
				max: 5,
				expected: 5,
			},
		]

		tests.forEach((test, i) => {
			const { value, min, max, expected } = test
			
			it(`Case ${i + 1}, bound ${value} to [${min}, ${max}]`, done => {
				should(value.limit(min, max))
					.be.exactly(expected)

				done()
			})
		})
	})

	describe("formatThousands()", () => {
		const tests: {
			value: number
			expected: string
		}[] = [
			{
				value: -10_000_000,
				expected: "-10 000 000",
			},
			{
				value: -1_000_000,
				expected: "-1 000 000",
			},
			{
				value: -100_000,
				expected: "-100 000",
			},
			{
				value: -10_000,
				expected: "-10 000",
			},
			{
				value: -1_000,
				expected: "-1 000",
			},
			{
				value: -100,
				expected: "-100",
			},
			{
				value: -10,
				expected: "-10",
			},
			{
				value: -1,
				expected: "-1",
			},
			{
				value: 1,
				expected: "1",
			},
			{
				value: 10,
				expected: "10",
			},
			{
				value: 100,
				expected: "100",
			},
			{
				value: 1_000,
				expected: "1 000",
			},
			{
				value: 10_000,
				expected: "10 000",
			},
			{
				value: 100_000,
				expected: "100 000",
			},
			{
				value: 1_000_000,
				expected: "1 000 000",
			},
			{
				value: 10_000_000,
				expected: "10 000 000",
			},
			// with decimals
			{
				value: -10_000_000.123456,
				expected: "-10 000 000.123456",
			},
			{
				value: -1_000_000.123456,
				expected: "-1 000 000.123456",
			},
			{
				value: -100_000.123456,
				expected: "-100 000.123456",
			},
			{
				value: -10_000.123456,
				expected: "-10 000.123456",
			},
			{
				value: -1_000.123456,
				expected: "-1 000.123456",
			},
			{
				value: -100.123456,
				expected: "-100.123456",
			},
			{
				value: -10.123456,
				expected: "-10.123456",
			},
			{
				value: -1.123456,
				expected: "-1.123456",
			},
			{
				value: 1.123456,
				expected: "1.123456",
			},
			{
				value: 10.123456,
				expected: "10.123456",
			},
			{
				value: 100.123456,
				expected: "100.123456",
			},
			{
				value: 1_000.123456,
				expected: "1 000.123456",
			},
			{
				value: 10_000.123456,
				expected: "10 000.123456",
			},
			{
				value: 100_000.123456,
				expected: "100 000.123456",
			},
			{
				value: 1_000_000.123456,
				expected: "1 000 000.123456",
			},
			{
				value: 10_000_000.123456,
				expected: "10 000 000.123456",
			},
		]

		tests.forEach((test, i) => {
			const { value, expected } = test
			it(`Case ${i + 1}, format ${value}`, done => {
				should(value.formatThousands())
					.be.exactly(expected)

				done()
			})
		})
	})

	describe("pluralize()", () => {
		const tests: {
			from: number
			toFixed?: number
			expected: string
		}[] = [
			{
				from: -Infinity,
				expected: "-Infinity tests",
			},
			{
				from: -2.56,
				expected: "-2.56 tests",
			},
			{
				from: -2,
				expected: "-2 tests",
			},
			{
				from: -1.3,
				expected: "-1.3 tests",
			},
			{
				from: -1,
				expected: "-1 test",
			},
			{
				from: 0,
				expected: "0 tests",
			},
			{
				from: 0.12,
				expected: "0.12 tests",
			},
			{
				from: 1,
				expected: "1 test",
			},
			{
				from: 1.09,
				expected: "1.09 tests",
			},
			{
				from: 1.0009,
				toFixed: 2,
				expected: "1 test",
			},
			{
				from: 2,
				expected: "2 tests",
			},
			{
				from: 2.76,
				expected: "2.76 tests",
			},
			{
				from: 2.7693,
				expected: "2.7693 tests",
			},
			{
				from: 2.7693,
				toFixed: 2,
				expected: "2.77 tests",
			},
			{
				from: Infinity,
				expected: "Infinity tests",
			},
		]

		tests.forEach((test, i) => {
			it(`Case #${i + 1}, pluralize from ${test.from}${typeof test.toFixed == "number" ? `, toFixed ${test.toFixed}` : ""}`, done => {
				should(test.from.pluralize("test", "tests", test.toFixed))
					.be.exactly(test.expected)

				done()
			})
		})
	})

	describe("asBytesToVerboseSize()", () => {
		const tests: {
			value: number
			customSizeNames?: SizeNames
			expected: string
		}[] = [
			{
				value: 0,
				expected: "0 bytes",
			},
			{
				value: 1,
				expected: "1 byte",
			},
			{
				value: 123,
				expected: "123 bytes",
			},
			{
				value: 1234,
				expected: "1.21 kB",
			},
			{
				value: 12345,
				expected: "12.06 kB",
			},
			{
				value: 123456,
				expected: "120.56 kB",
			},
			{
				value: 1234567,
				expected: "1.18 MB",
			},
			{
				value: 12345678,
				expected: "11.77 MB",
			},
			{
				value: 123456789,
				expected: "117.74 MB",
			},
			{
				value: 1234567890,
				expected: "1.15 GB",
			},
			{
				value: 1024 ** 4,
				expected: "1 TB",
			},
			{
				value: 1024 ** 4 * 1.45,
				expected: "1.45 TB",
			},
			{
				value: 1,
				customSizeNames: {
					bytes: ["BYTE", "BYTES"],
				},
				expected: "1 BYTE",
			},
			{
				value: 2,
				customSizeNames: {
					bytes: ["BYTE", "BYTES"],
				},
				expected: "2 BYTES",
			},
			{
				value: 1024,
				customSizeNames: {
					kilobytes: ["kbyte", "kbytes"],
				},
				expected: "1 kbyte",
			},
			{
				value: 1024 * 1.2,
				customSizeNames: {
					kilobytes: ["kbyte", "kbytes"],
				},
				expected: "1.2 kbytes",
			},
			{
				value: 1024 * 1024,
				customSizeNames: {
					megabytes: ["Mbyte", "Mbytes"],
				},
				expected: "1 Mbyte",
			},
			{
				value: 1024 * 1024 * 1.223,
				customSizeNames: {
					megabytes: ["Mbyte", "Mbytes"],
				},
				expected: "1.22 Mbytes",
			},
			{
				value: 1024 * 1024 * 1024,
				customSizeNames: {
					gigabytes: ["Gbyte", "Gbytes"],
				},
				expected: "1 Gbyte",
			},
			{
				value: 1024 * 1024 * 1024 * 1.228,
				customSizeNames: {
					gigabytes: ["Gbyte", "Gbytes"],
				},
				expected: "1.23 Gbytes",
			},
			{
				value: 1024 ** 4,
				customSizeNames: {
					terabytes: ["Tbyte", "Tbytes"],
				},
				expected: "1 Tbyte",
			},
			{
				value: 1024 ** 4 * 1.45,
				customSizeNames: {
					terabytes: ["Tbyte", "Tbytes"],
				},
				expected: "1.45 Tbytes",
			},
		]

		tests.forEach((test, i) => {
			const { value, expected } = test
			it(`Case ${i + 1}, ${value} byte(s)`, done => {
				should(value.asBytesToVerboseSize(test.customSizeNames))
					.be.exactly(expected)

				done()
			})
		})
	})

	describe("asSecondsToTime()", () => {
		const tests: {
			value: number
			expected: string
			separateDays?: boolean
		}[] = [
			{
				value: -68,
				expected: "-01:08",
			},
			{
				value: -1,
				expected: "-00:01",
			},
			{
				value: 0,
				expected: "00:00",
			},
			{
				value: 42,
				expected: "00:42",
			},
			{
				value: 93,
				expected: "01:33",
			},
			{
				value: 134,
				expected: "02:14",
			},
			{
				value: 300,
				expected: "05:00",
			},
			{
				value: 300 * 5 + 59,
				expected: "25:59"
			},
			{
				value: 3600,
				expected: "1:00:00",
			},
			{
				value: 3915,
				expected: "1:05:15",
			},
			{
				value: 3600 * 23 + 69,
				expected: "23:01:09",
			},
			{
				value: 3600 * 24 + 69,
				expected: "24:01:09",
			},
			{
				value: 3600 * 25 + 88,
				expected: "25:01:28",
			},


			{
				value: 3600 * 23 + 69,
				expected: "23:01:09",
				separateDays: true,
			},
			{
				value: 3600 * 24 + 69,
				expected: "1 day 00:01:09",
				separateDays: true,
			},
			{
				value: 3600 * 25 + 88,
				expected: "1 day 01:01:28",
				separateDays: true,
			},
			{
				value: 3600 * 50 + 88,
				expected: "2 days 02:01:28",
				separateDays: true,
			},
		]

		tests.forEach((test, i) => {
			const { value, expected, separateDays } = test
			it(`Case ${i + 1}, ${value} second(s)`, done => {
				should(value.asSecondsToTime(separateDays))
					.be.exactly(expected)

				done()
			})
		})
	})

	describe("asSecondsToVerboseTime()", () => {
		const tests: {
			value: number
			expected: string
		}[] = [
			{
				value: -68,
				expected: "-1 min 8 sec",
			},
			{
				value: -1,
				expected: "-1 sec",
			},
			{
				value: 0,
				expected: "0 sec",
			},
			{
				value: 42,
				expected: "42 sec",
			},
			{
				value: 93,
				expected: "1 min 33 sec",
			},
			{
				value: 134,
				expected: "2 min 14 sec",
			},
			{
				value: 300,
				expected: "5 min",
			},
			{
				value: 300 * 5 + 59,
				expected: "25 min 59 sec"
			},
			{
				value: 3600,
				expected: "1 h",
			},
			{
				value: 3915,
				expected: "1 h 5 min 15 sec",
			},
			{
				value: 3600 * 23 + 69,
				expected: "23 h 1 min 9 sec",
			},
			{
				value: 3600 * 24 + 69,
				expected: "24 h 1 min 9 sec",
			},
			{
				value: 3600 * 25 + 88,
				expected: "25 h 1 min 28 sec",
			}
		]

		tests.forEach((test, i) => {
			const { value, expected } = test
			it(`Case ${i + 1}, ${value} second(s)`, done => {
				should(value.asSecondsToVerboseTime())
					.be.exactly(expected)

				done()
			})
		})
	})
})