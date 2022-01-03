declare namespace imports.gi.GWeather {
  type FilterFunc = (...args: unknown[]) => boolean

  enum LocationLevel {
    WORLD = 0, //A location representing the entire world.
    REGION = 1, // A location representing a continent or other top-level region.
    COUNTRY = 2, // A location representing a "country" (or other geographic unit that has an ISO-3166 country code)
    ADM1 = 3, // A location representing a "first-level administrative division"; ie, a state, province, or similar division.
    CITY = 4, // A location representing a city
    WEATHER_STATION = 5, // A location representing a weather station.
    DETACHED = 6, // A location that is detached from the database, for example because it was loaded from external storage and could not be fully recovered. The parent of this location is the nearest weather station.
    NAMED_TIMEZONE = 7, // A location representing a named or special timezone in the world, such as UTC
  }

  enum Provider {
    NONE = 0, //no provider, no weather information available
    METAR = 1, // METAR office, providing current conditions worldwide
    IWIN = 4, //US weather office, providing 7 days of forecast
    YAHOO = 8, // Yahoo Weather Service, removed in 3.27.1
    MET_NO = 16, // MET.no service, worldwide but requires attribution and a subscription to the API users mailing-list.
    OWM = 32, // OpenWeatherMap, worldwide and possibly more reliable, but requires attribution and is limited in the number of queries
    ALL = 61, // enable all available providers
  }

  enum TemperatureUnit {
    INVALID = 0, // invalid unit
    DEFAULT = 1, // the user preferred temperature unit
    KELVIN = 2, // Kelvin (absolute) temperature scale
    CENTIGRADE = 3, // Celsius temperature scale
    FAHRENHEIT = 4, // Fahrenheit temperature scale
  }

  enum PressureUnit {
    INVALID = 0, // invalid unit
    DEFAULT = 1, // the user preferred pressure unit
    KPA = 2, // kiloPascal (* 10^3 Pa)
    HPA = 3, // hectoPascal (* 10^2 Pa); also known as millibars, but formatted differently
    MB = 4, // millibars; same as GWeather.PressureUnit.HPA
    MM_HG = 5, // millimeters of mercury
    INCH_HG = 6, // inches of mercury
    ATM = 7, // atmospheres
  }

  enum DistanceUnit {
    INVALID = 0, // invalid unit
    DEFAULT = 1, // the user preferred distance unit
    METERS = 2, // meters
    KM = 3, // kilometers (= 1000 meters)
    MILES = 4, // miles
  }

  enum SpeedUnit {
    INVALID = 0, // invalid unit
    DEFAULT = 1, // the user preferred speed unit
    MS = 2, // meters per second
    KPH = 3, // kilometers per hour
    MPH = 4, // miles per hour
    KNOTS = 5, // knots
    BFT = 6, // Beaufort scale
  }

  enum ConditionPhenomenon {
    INVALID = -1, // value not available
    NONE = 0, // no significant phenomenon
    DRIZZLE = 1,
    RAIN = 2,
    SNOW = 3,
    SNOW_GRAINS = 4,
    ICE_CRYSTALS = 5,
    ICE_PELLETS = 6,
    HAIL = 7,
    SMALL_HAIL = 8,
    UNKNOWN_PRECIPITATION = 9,
    MIST = 10,
    FOG = 11,
    SMOKE = 12,
    VOLCANIC_ASH = 13,
    SAND = 14,
    HAZE = 15,
    SPRAY = 16,
    DUST = 17,
    SQUALL = 18,
    SANDSTORM = 19,
    DUSTSTORM = 20,
    FUNNEL_CLOUD = 21,
    TORNADO = 22,
    DUST_WHIRLS = 23,
    LAST = 24,
  }

  enum ConditionQualifier {
    INVALID = -1, // value not available
    NONE = 0, // no qualifier for the phenomenon
    VICINITY = 1, // phenomenon happening in the proximity of the location, not in the actual location
    LIGHT = 2, // phenomenon is light or predicted to be light
    MODERATE = 3, // phenomenon is moderate or predicted to be moderate
    HEAVY = 4, // phenomenon is heavy or predicted to be heavy
    SHALLOW = 5, // shallow fog (only valid with GWeather.ConditionPhenomenon.FOG)
    PATCHES = 6, // patches of fog (only valid with GWeather.ConditionPhenomenon.FOG)
    PARTIAL = 7, // partial fog (only valid with GWeather.ConditionPhenomenon.FOG)
    THUNDERSTORM = 8, // phenomenon will be a thunderstorm and/or will include lightning
    BLOWING = 9, // phenomenon is blowing (valid with GWeather.ConditionPhenomenon.SNOW, GWeather.ConditionPhenomenon.SAND, GWeather.ConditionPhenomenon.SPRAY, GWeather.ConditionPhenomenon.DUST)
    SHOWERS = 10, // phenomenon is heavy and involves showers
    DRIFTING = 11, // phenomenon is moving across (valid with GWeather.ConditionPhenomenon.SAND and GWeather.ConditionPhenomenon.DUST)
    FREEZING = 12, // phenomenon is freezing and involves ice
    LAST = 13, // maximum value of the enumeration.
  }

  type MoonPhase = any
  type MoonLatitude = any
  type Sky = any

  enum WindDirection {
    INVALID = -1, // value not available
    VARIABLE = 0, // variable throughout the day
    N = 1, // north
    NNE = 2, // north-north-east
    NE = 3, // north-east
    ENE = 4, // east-north-east
    E = 5, // east
    ESE = 6, // east-south-east
    SE = 7, // south-east
    SSE = 8, // south-south-east
    S = 9, // south
    SSW = 10, // south-south-west
    SW = 11, // south-west
    WSW = 12, // west-south-west
    W = 13, // west
    WNW = 14, // west-north-west
    NW = 15, // north-west
    NNW = 16, // north-north-west
    LAST = 17, // maximum value for the enumeration
  }

  class Timezone {
    get_dst_offset(): number
    get_name(): string
    get_offset(): number
    get_tzid(): string
    has_dst(): boolean
    ref(): Timezone
    unref(): void

    static get_by_tzid(tzid: string): Timezone
    static get_utc(): Timezone | null
  }

  class Location {
    deserialize(serialized: imports.gi.GLib.Variant): Location
    detect_nearest_city(
      lat: number,
      lon: number,
      cancellable: imports.gi.Gio.Cancellable,
      callback: imports.gi.Gio.AsyncReadyCallback,
    ): void
    equal(two: Location): boolean
    find_by_country_code(country_code: string): Location | null
    find_by_station_code(station_code: string): Location | null
    find_nearest_city(lat: number, lon: number): Location
    find_nearest_city_full(lat: number, lon: number, func: FilterFunc): Location
    free_timezones(zones: Timezone): void
    get_children(): Location[]
    get_city_name(): string | null
    get_code(): string | null
    get_coords():
      | [number, number]
      | {
          latitude: number
          longitude: number
        }
    get_country(): string | null
    get_country_name(): string | null
    get_distance(loc2: Location): number
    get_english_name(): string
    get_english_sort_name(): string
    get_level(): LocationLevel
    get_name(): string
    get_parent(): Location | null
    get_sort_name(): string
    get_timezone(): Timezone | null
    get_timezone_str(): string | null
    get_timezones(): Timezone[]
    has_coords(): boolean
    next_child(child: Location): Location | null
    ref(): Location
    serialize(): imports.gi.GLib.Variant
    unref(): void

    static detect_nearest_city_finish(result: imports.gi.Gio.AsyncResult): Location
    static get_world(): Location | null
    static new_detached(name: string, icao: string, latitude: number, longitude: number): Location
  }

  interface IInfo {
    'application-id': string
    'contact-info': string
    'enabled-providers': Provider
    location: Location
  }

  interface IOk {
    ok: boolean
  }

  type IOkValue<V = number> = IOk & {
    value: V
  }

  class Info {
    constructor(params: IInfo)

    abort(): void
    get_apparent(): string
    get_application_id(): string
    get_attribution(): string
    get_conditions(): string
    get_contact_info(): string
    get_dew(): string
    get_enabled_providers(): Provider
    get_forecast_list(): Info[]
    get_humidity(): string
    get_icon_name(): string
    get_location(): Location
    get_location_name(): string
    get_pressure(): string
    get_radar(): imports.gi.GdkPixbuf.PixbufAnimation
    get_sky(): string
    get_sunrise(): string
    get_sunset(): string
    get_symbolic_icon_name(): string
    get_temp(): string
    get_temp_max(): string
    get_temp_min(): string
    get_temp_summary(): string
    get_upcoming_moonphases(): IOk & {
      phases: number[]
    }
    get_update(): string
    get_value_apparent(unit: TemperatureUnit): IOkValue
    get_value_conditions(): IOk & {
      phenomenon: ConditionPhenomenon
      qualifier: ConditionQualifier
    }
    get_value_dew(unit: TemperatureUnit): IOkValue
    get_value_moonphase(): IOkValue<MoonPhase> & {
      lat: MoonLatitude
    }
    get_value_pressure(unit: PressureUnit): IOkValue
    get_value_sky(): IOk & {
      sky: Sky
    }
    get_value_sunrise(): IOkValue
    get_value_sunset(): IOkValue
    get_value_temp(unit: TemperatureUnit): IOkValue
    get_value_temp_max(unit: TemperatureUnit): IOkValue
    get_value_temp_min(unit: TemperatureUnit): IOkValue
    get_value_update(): IOkValue
    get_value_visibility(unit: DistanceUnit): IOkValue
    get_value_wind(unit: SpeedUnit): IOk & {
      speed: number
      direction: WindDirection
    }
    get_visibility(): string
    get_weather_summary(): string
    get_wind(): string
    is_daytime(): boolean
    is_valid(): boolean
    network_error(): boolean
    next_sun_event(): number
    set_application_id(application_id: string): void
    set_contact_info(contact_info: string): void
    /**
     *
     * @param providers bitmask of Provider
     */
    set_enabled_providers(providers: number): void
    set_location(location: Location): void
    update(): void

    connect(name: 'updated', cb: (info: this) => void): number

    static store_cache(): void
    static new(location: Location): Info
  }
}
