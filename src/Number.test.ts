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

	describe("as()", () => {
		describe("Size units", () => {
			describe("to()", () => {
				const KS = 1024
				const multipliers: {
					[key in SOLSizeUnit]: {
						[key in SOLSizeUnit]: number
					}
				} = {
					bytes: {
						bytes: 1,
						kilobytes: KS,
						megabytes: KS ** 2,
						gigabytes: KS ** 3,
						terabytes: KS ** 4,
					},
					kilobytes: {
						bytes: 1 / KS,
						kilobytes: 1,
						megabytes: 1024,
						gigabytes: 1024 ** 2,
						terabytes: 1024 ** 3,
					},
					megabytes: {
						bytes: 1 / (KS ** 2),
						kilobytes: 1 / KS,
						megabytes: 1,
						gigabytes: 1024,
						terabytes: 1024 ** 2,
					},
					gigabytes: {
						bytes: 1 / (KS ** 3),
						kilobytes: 1 / (KS ** 2),
						megabytes: 1 / KS,
						gigabytes: 1,
						terabytes: 1 * KS,
					},
					terabytes: {
						bytes: 1 / (KS ** 4),
						kilobytes: 1 / (KS ** 3),
						megabytes: 1 / (KS ** 2),
						gigabytes: 1 / KS,
						terabytes: 1,
					},
				}

				const values = [0.1, 0.125, 0.5, 1, 10, 512, 1024, 2048]

				values.forEach((value, i) => {
					(Object.keys(multipliers) as SOLSizeUnit[]).forEach((from, j, keys) => {
						(Object.keys(multipliers[from]) as SOLSizeUnit[]).forEach((to, k) => {
							const expected = value / multipliers[from][to]
							it(`Case #${values.length * keys.length * i + keys.length * j + k + 1}: ${value} ${from} to ${to} to be ${expected}`, done => {
								should(value.as(from).to(to))
									.be.exactly(expected)

								done()
							})
						})
					})
				})
			})

			describe("toVerboseString()", () => {
				const tests: {
					value: number
					as: SOLSizeUnit,
					customSizeNames?: SOLSizeNames
					expected: string
				}[] = [
					{
						value: 0,
						as: "bytes",
						expected: "0 bytes",
					},
					{
						value: 0,
						as: "megabytes",
						expected: "0 bytes",
					},
					{
						value: 0,
						as: "gigabytes",
						expected: "0 bytes",
					},
					{
						value: 0,
						as: "terabytes",
						expected: "0 bytes",
					},
					{
						value: 1,
						as: "bytes",
						expected: "1 byte",
					},
					{
						value: 1,
						as: "kilobytes",
						expected: "1 kB",
					},
					{
						value: 1,
						as: "megabytes",
						expected: "1 MB",
					},
					{
						value: 1,
						as: "gigabytes",
						expected: "1 GB",
					},
					{
						value: 1,
						as: "terabytes",
						expected: "1 TB",
					},
					{
						value: 0.5,
						as: "bytes",
						expected: "0.5 bytes",
					},
					{
						value: 0.5,
						as: "kilobytes",
						expected: "512 bytes",
					},
					{
						value: 0.5,
						as: "megabytes",
						expected: "512 kB",
					},
					{
						value: 0.5,
						as: "gigabytes",
						expected: "512 MB",
					},
					{
						value: 0.5,
						as: "terabytes",
						expected: "512 GB",
					},
					{
						value: 123,
						as: "bytes",
						expected: "123 bytes",
					},
					{
						value: 1234,
						as: "bytes",
						expected: "1.21 kB",
					},
					{
						value: 12345,
						as: "bytes",
						expected: "12.06 kB",
					},
					{
						value: 123456,
						as: "bytes",
						expected: "120.56 kB",
					},
					{
						value: 1234567,
						as: "bytes",
						expected: "1.18 MB",
					},
					{
						value: 12345678,
						as: "bytes",
						expected: "11.77 MB",
					},
					{
						value: 123456789,
						as: "bytes",
						expected: "117.74 MB",
					},
					{
						value: 1234567890,
						as: "bytes",
						expected: "1.15 GB",
					},
					{
						value: 1024 ** 4,
						as: "bytes",
						expected: "1 TB",
					},
					{
						value: 1024 ** 4 * 1.45,
						as: "bytes",
						expected: "1.45 TB",
					},
					{
						value: 1,
						as: "bytes",
						customSizeNames: {
							bytes: ["BYTE", "BYTES"],
						},
						expected: "1 BYTE",
					},
					{
						value: 2,
						as: "bytes",
						customSizeNames: {
							bytes: ["BYTE", "BYTES"],
						},
						expected: "2 BYTES",
					},
					{
						value: 1024,
						as: "bytes",
						customSizeNames: {
							kilobytes: ["kbyte", "kbytes"],
						},
						expected: "1 kbyte",
					},
					{
						value: 1024 * 1.2,
						as: "bytes",
						customSizeNames: {
							kilobytes: ["kbyte", "kbytes"],
						},
						expected: "1.2 kbytes",
					},
					{
						value: 1024 * 1024,
						as: "bytes",
						customSizeNames: {
							megabytes: ["Mbyte", "Mbytes"],
						},
						expected: "1 Mbyte",
					},
					{
						value: 1024 * 1024 * 1.223,
						as: "bytes",
						customSizeNames: {
							megabytes: ["Mbyte", "Mbytes"],
						},
						expected: "1.22 Mbytes",
					},
					{
						value: 1024 * 1024 * 1024,
						as: "bytes",
						customSizeNames: {
							gigabytes: ["Gbyte", "Gbytes"],
						},
						expected: "1 Gbyte",
					},
					{
						value: 1024 * 1024 * 1024 * 1.228,
						as: "bytes",
						customSizeNames: {
							gigabytes: ["Gbyte", "Gbytes"],
						},
						expected: "1.23 Gbytes",
					},
					{
						value: 1024 ** 4,
						as: "bytes",
						customSizeNames: {
							terabytes: ["Tbyte", "Tbytes"],
						},
						expected: "1 Tbyte",
					},
					{
						value: 1024 ** 4 * 1.45,
						as: "bytes",
						customSizeNames: {
							terabytes: ["Tbyte", "Tbytes"],
						},
						expected: "1.45 Tbytes",
					},
				]

				tests.forEach((test, i) => {
					it(`Case #${i + 1}: ${test.value} ${test.as}`, done => {
						should(test.value.as(test.as).toVerboseString(test.customSizeNames))
							.be.exactly(test.expected)

						done()
					})
				})
			})
		})

		describe("Time units", () => {
			describe("to()", () => {
				const multipliers: {
					[key in SOLTimeUnit]: {
						[key in SOLTimeUnit]: number
					}
				} = {
					seconds: {
						seconds: 1,
						minutes: 60,
						hours: 60 ** 2,
						days: 60 ** 2 * 24,
					},
					minutes: {
						seconds: 1 / 60,
						minutes: 1,
						hours: 60,
						days: 60 * 24,
					},
					hours: {
						seconds: 1 / 60 ** 2,
						minutes: 1 / 60,
						hours: 1,
						days: 24,
					},
					days: {
						seconds: 1 / (60 ** 2 * 24),
						minutes: 1 / (60 * 24),
						hours: 1 / 24,
						days: 1,
					},
				}

				const values = [0.1, 1 / 3, 0.5, 1, 10, 60, 120]

				values.forEach((value, i) => {
					(Object.keys(multipliers) as SOLTimeUnit[]).forEach((from, j, keys) => {
						(Object.keys(multipliers[from]) as SOLTimeUnit[]).forEach((to, k) => {
							const expected = (value / multipliers[from][to]).toFixed(5)
							it(`Case #${values.length * keys.length * i + keys.length * j + k + 1}: ${value} ${from} to ${to} to be ${Number(expected)}`, done => {
								should(value.as(from).to(to).toFixed(5))
									.be.exactly(expected)

								done()
							})
						})
					})
				})
			})

			describe("toTimeString()", () => {
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
					it(`Case #${i + 1}: ${test.value} seconds${test.separateDays ? " (separate days)" : ""} to be ${test.expected}`, done => {
						should(test.value.as("seconds").toTimeString(test.separateDays))
							.be.exactly(test.expected)

						done()
					})
				})
			})
		})
	})
})